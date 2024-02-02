const fs = require('fs')
const singolare = process.argv[2]
if (!singolare) {
    throw new Error('Nome singolare del modulo')
}

const plurale = process.argv[3] || singolare

const basePath = 'src/app/modules/admin/'

// Creo le cartelle
!fs.existsSync(basePath) && fs.mkdirSync(basePath)
!fs.existsSync(basePath + snakeCase(singolare)) && fs.mkdirSync(basePath + snakeCase(singolare))
!fs.existsSync(basePath + snakeCase(singolare) + '/list') && fs.mkdirSync(basePath + snakeCase(singolare) + '/list')
!fs.existsSync(basePath + snakeCase(singolare) + '/details') && fs.mkdirSync(basePath + snakeCase(singolare) + '/details')

// Creo i files
creaFileDaStub('types', singolare, plurale, 'ts')
creaFileDaStub('service', singolare, plurale, 'ts')
creaFileDaStub('routing', singolare, plurale, 'ts')
creaFileDaStub('module', singolare, plurale, 'ts')
creaFileDaStub('component', singolare, plurale, 'ts')
creaFileDaStub('component', singolare, plurale, 'html')

creaNestedFileDaStub('details', singolare, plurale, 'html')
creaNestedFileDaStub('details', singolare, plurale, 'scss')
creaNestedFileDaStub('details', singolare, plurale, 'ts')

creaNestedFileDaStub('list', singolare, plurale, 'scss')
creaNestedFileDaStub('list', singolare, plurale, 'ts')

appendRotta(singolare, plurale)

function creaFileDaStub(type: string, singolare: string, plurale: string, ext: string) {
    try {
        const file = fs.readFileSync('./stubs/stub.' + type + '.' + ext, 'utf8')
        fs.writeFileSync(
            basePath + snakeCase(singolare) + '/' + snakeCase(singolare) + '.' + type + '.' + ext,
            replaceDummies(file, singolare, plurale)
        )
    } catch (err) {
        throw new Error(err)
    }
    console.log('Generato File Componente ' + type)
}

function creaNestedFileDaStub(type: string, singolare: string, plurale: string, ext: string) {
    try {
        const file = fs.readFileSync(`./stubs/${type}/${type}.component.${ext}`, 'utf8')
        fs.writeFileSync(`${basePath}${snakeCase(singolare)}/${type}/${type}.component.${ext}`, replaceDummies(file, singolare, plurale))
    } catch (err) {
        throw new Error(err)
    }
    console.log('Generato File Nested ' + type)
}

function appendRotta(singolare: string, plurale: string) {
    try {
        const file = fs.readFileSync('src/app/app.routing.ts', 'utf8')
        // L'indentazione è importante
        const newFile = file.replace(
            /\/\*\* Don't delete used by generate-crud \*\//g,
            `{
                path: '${kebabCase(plurale)}',
                loadChildren: () => import('app/modules/admin/${snakeCase(singolare)}/${snakeCase(
                singolare
            )}.module').then((m) => m.${pascalCase(singolare)}Module),
            },
            /** Don't delete used by generate-crud */`
        )

        fs.writeFileSync('src/app/app.routing.ts', newFile)
    } catch (err) {
        throw new Error(err)
    }
    console.log(`Aggiunta rotta: ${kebabCase(plurale)}`)
}

function replaceDummies(content: string, singolare: string, plurale: string) {
    return content
        .replace(/DUMMies_CASE/g, snakeCase(plurale).toUpperCase())
        .replace(/dummies_case/g, snakeCase(plurale))
        .replace(/DummiesCase/g, pascalCase(plurale))
        .replace(/dummiesCase/g, camelCase(plurale))
        .replace(/dummies-case/g, kebabCase(plurale))
        .replace(/DUMMY_CASE/g, snakeCase(singolare).toUpperCase())
        .replace(/dummy_case/g, snakeCase(singolare))
        .replace(/DummyCase/g, pascalCase(singolare))
        .replace(/dummyCase/g, camelCase(singolare))
        .replace(/dummy-case/g, kebabCase(singolare))
}

/**
 * Restituisce la stringa in camelCase, le parole devono esser separate da: " ", "-", "_".
 *
 * @param str Stringa da convertire in camelCase
 * @returns
 * @example "ciao mondo" -> "ciaoMondo"
 */
function camelCase (str: string): string {
    return str
        .trim()
        .toLowerCase()
        .split(/(?:[_-]+|\s+)/g)
        .map((word, index) => {
            if (index === 0) {
                return word.toLowerCase()
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        })
        .join('')
}

/**
 * Restituisce la stringa in PascalCase, le parole devono esser separate da: " ", "-", "_".
 *
 * @param str Stringa da convertire in PascalCase
 * @returns
 * @example "ciao mondo" -> "CiaoMondo"
 */
function pascalCase (str: string): string {
    return str
        .trim()
        .toLowerCase()
        .split(/(?:[_-]+|\s+)/g)
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        })
        .join('')
}

/**
 * Restituisce la stringa in snake_case, le parole devono esser separate da: " ", "-", "_".
 *
 * @param str Stringa da convertire in snake_case
 * @returns
 * @example "ciao mondo" -> "ciao_mondo"
 */
function snakeCase (str: string): string {
    return str
        .trim()
        .toLowerCase()
        .split(/(?:[_-]+|\s+)/g)
        .map((word) => {
            return word.toLowerCase()
        })
        .join('_')
}

/**
 * Restituisce la stringa in kebab-case, le parole devono esser separate da: " ", "-", "_".
 *
 * @param str Stringa da convertire in kebab-case
 * @returns
 * @example "ciao mondo" -> "ciao-mondo"
 */
function kebabCase (str: string): string {
    return str
        .trim()
        .toLowerCase()
        .split(/(?:[_-]+|\s+)/g)
        .map((word) => {
            return word.toLowerCase()
        })
        .join('-')
}