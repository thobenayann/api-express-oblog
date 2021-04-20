module.exports = {
    // Middleware pour gérer les erreurs 404
    async error404(request, response, next) {
        response.status(404).json({
            error: {
                code: 404,
                type: "not found",
                message: `${42} not found`
            }
        });
    },
    async error500(error, request, response, next) {

    },
};