const ts = require('typescript')
const fs = require('fs')
var fsPath = require('fs-path')
const { transformFileSync } = require('babel-core')

function watch (rootFileNames, options) {
  const files = {}

  // initialize the list of files
  rootFileNames.forEach(fileName => {
    files[fileName] = { version: 0 }
  })

  // Create the language service host to allow the LS to communicate with the host
  const servicesHost = {
    getScriptFileNames: () => rootFileNames,
    getScriptVersion: (fileName) => files[fileName] && files[fileName].version.toString(),
    getScriptSnapshot: (fileName) => {
      if (!fs.existsSync(fileName)) {
        return undefined
      }

      return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString())
    },
    getCurrentDirectory: () => process.cwd(),
    getCompilationSettings: () => options,
    getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options),
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory
  }

  // Create the language service files
  const services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry())

  // Now let's watch the files
  rootFileNames.forEach(fileName => {
    // First time around, emit all files
    emitFile(fileName)

    // Add a watch on the file to handle next change
    fs.watchFile(fileName,
      { persistent: true, interval: 250 },
      (curr, prev) => {
        // Check timestamp
        if (+curr.mtime <= +prev.mtime) {
          return
        }

        // Update the version to signal a change in the file
        files[fileName].version++

        // write the changes to disk
        emitFile(fileName)
      })
  })
  function emitFile (fileName) {
    let output = services.getEmitOutput(fileName)

    if (!output.emitSkipped) {
      console.log(`Emitting ${fileName}`)
    } else {
      console.log(`Emitting ${fileName} failed`)
      logErrors(fileName)
    }

    function babelTranspile (fileName) {
      const babelClientResult = transformFileSync(fileName, {
        sourceRoot: path.join(__dirname, '..'),
        sourceMaps: 'inline',
        extends: path.join(__dirname, './.client.babelrc')
      })
      const root = path.join(__dirname, '..')
      let distPath = fileName.replace(root, '')
      distPath = path.join(root, 'dist', distPath)
      fsPath.writeFileSync(distPath.replace(/\.tsx|\.ts/, '.js'), babelClientResult.code, 'utf8')

      const babelServerResult = transformFileSync(fileName, {
        sourceRoot: path.join(__dirname, '..'),
        sourceMaps: 'inline',
        extends: path.join(__dirname, './.server.babelrc')
      })
      fs.writeFileSync(fileName, babelServerResult.code, 'utf8')
    }

    output.outputFiles.forEach(o => {
      fs.writeFileSync(o.name, o.text, 'utf8')
      if (!/.+\.map/.test(o.name)) {
        babelTranspile(o.name)
      } else {

      }
    })
  }

  function logErrors (fileName) {
    let allDiagnostics = services.getCompilerOptionsDiagnostics()
      .concat(services.getSyntacticDiagnostics(fileName))
      .concat(services.getSemanticDiagnostics(fileName))

    allDiagnostics.forEach(diagnostic => {
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
      if (diagnostic.file) {
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
        console.log(`  Error ${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`)
      } else {
        console.log(`  Error: ${message}`)
      }
    })
  }
}
// Start the watcher
const path = require('path')
const glob = require('glob')

glob('**/*.ts*', { ignore: ['**/bin/**', '**/node_modules/**', '**/dist/**'], root: path.join(__dirname, '..') }, function (err, files) {
  if (err) throw err
  var tsconfig = require('../tsconfig.json')
  const config = ts.convertCompilerOptionsFromJson(tsconfig.compilerOptions, path.join(__dirname, '..'))
  watch(files, config.options)
})
