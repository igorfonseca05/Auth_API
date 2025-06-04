
// Modelo de resposta padrão
function response(success = null, statusCode = null, message = null, user = []) {

    let field = user.length > 1 ? 'users' : 'user'

    return {
        success,
        statusCode,
        message,
        ...([field] && { user }),
    }
}

module.exports = response