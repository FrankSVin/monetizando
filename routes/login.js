const express = require('express');
const router = express.Router();
const isNull = require('../script').isNull;
const Database = require('../Database');
const Cryptr = require('cryptr');
const config = require('../config');
const cryptr = new Cryptr(config.security.key);

// rota de autenticação
router.post('/', (req, res, next) => {
	console.log('tentando autenticar...');
	
	try {
		
		// após o body, são os nomes dos campos no formulário	
		const {login, password} = req.body;
		console.log('Login do cara: ', login);
		const msgErro = {'mensagem': 'Login e/ou senha inválidos!'};
		console.log('senha do cara: ',password);


		if (isNull(login) || isNull(password)) {
			console.log('Login e/ou senha inválidos');
			console.log('error');
			res.render('login', msgErro);
		} else {
			console.log('vish')
			console.log('tentando consulta no banco...');
			// altere aqui o seu select de acordo com sua tabela DO BANCO
			Database.query(`SELECT * FROM TBD_BANCO WHERE EMAIL = '${login}';`).then(results => {
				console.log(login);
				//COMEÇO RETORNO DO SELECT PARA EFETUAR LOGIN
				console.log(`Linhas: ${results.recordsets[0].length}`);
				let linhas = results.recordsets[0];
				console.log(linhas.length);
				if (linhas.length > 0) {//SE TAMANHO DE LINHAS FOR MAIOR QUE ZERO, ENTRA NA CONDIÇÃO
					let senhaBanco = linhas[0].SENHA; // é 'senha' o nome de seu campo DO BANCO?
					console.log('Senha do usuário: ',senhaBanco)
					if (senhaBanco === password) {
						console.log('vamo ver se loga agora nessa bosta');
						let user = {
						//	mantenha "nome" e "login" nos antes dos ":"
						nome: linhas[0].NOMEBANCO, // é 'nome' o nome de seu campo do BANCO?
						login: linhas[0].EMAIL, // é 'login' o nome de seu campo DO BANCO?
						};
						console.log(user);
						//req.session.user = user;
						res.status(200).send('ok');
					} else {
						console.log('retornou voce?')
						res.status(401).send(msgErro);
					}
				} else {
					console.log('Ou você?')
					res.status(401).send(msgErro);
				}
			}).catch(error => {
				console.log('Catch da query')
				res.status(401).send(msgErro);
			});
		}
    
	} catch (e) {
		console.error(`erro: ${e}`);
		res.send({'mensagem':`${e}`});
	}

});

// rota que recupera os dados do usuário na sessão
// a princípio, não precisa mexer aqui
router.get('/sessao', (req, res, next) => {
    if (req.session.user && req.session.user) {
		const usuario = req.session.user;
        res.json({
            'nome': usuario.nome,
            'login': usuario.login,
        });
    } else {
        res.status(401).json({
            'mensagem': 'Nenhum usuário na sessão'
        });
    }
});

module.exports = router;
