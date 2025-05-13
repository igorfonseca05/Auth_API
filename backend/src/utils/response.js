
// Modelo de resposta padrão
function response(success = null, statusCode = null, message = null, user = {}) {
    return {
        success,
        statusCode,
        message,
        user: { ...user },
    }
}

module.exports = response