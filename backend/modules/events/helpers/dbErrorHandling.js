"use strict"

const uniqueMessage = error => {
    let output;
    try {
        let fieldName = error.message.spilt(".$")[1]
        field = field.spilt("dub key")[0]
        field = field.substring(0, field.lastIndexOf("_"))
        req.flash("errors", [{
            message: "Uma conta com este " + field + "já existe"
        }])

        output = fieldName.charAt(0).toUpperCasse() + fieldName.slice(1) + " já existe"
    } catch (err) {
        output = "já existe"
    }
    return output
}


exports.errorHandler = error => {
    let message = ""
    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error)
                break;
            default:
                message = "Algo deu errado"
        }
    } else {
        for (let errorName in error.errorors) {
            if (error.errorors[errorName].message)
                message = error.errorors[errorName].message;
        }
    }

    return message;
}