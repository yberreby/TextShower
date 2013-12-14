{exec} = require 'child_process'

task 'build', 'Build project from Coffee/ to JS/', ->
  exec 'coffee -c *.coffee', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr
  exec 'uglifyjs TextShower.js -o TextShower.min.js'

task 'watch', 'Watch changes', ->
  exec 'coffee -cw *.coffee', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr