exports.registerController = (req, res) => {
    // TESTE DE ROTA
    // res.json({
    //     sucess: true,
    //     message: 'Register route'
    // })

    const { name, email, password } = req.body
    console.log (name, email, password)
}