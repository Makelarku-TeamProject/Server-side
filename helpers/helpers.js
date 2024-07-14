class Helpers{
    static responBody(paramStatus, paramBody) {
        return {
            status:  paramStatus,
            data: paramBody
        }
    }
}

module.exports = Helpers
