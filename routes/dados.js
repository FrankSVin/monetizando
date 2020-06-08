const express = require("express");
const router = express.Router();
const isNull = require("../script").isNull;
const Database = require("../Database");
const Cryptr = require("cryptr");
const config = require("../config");
const cryptr = new Cryptr(config.security.key);
//const moment = require("moment-timezone");


//const ambiente;
//const ultimo;
//const primeiro;


router.get("/ram", (req, res, next) => {
    //console.log("o porra");
    Database.query(
      `SELECT QUANTIDADE_MEMORIA_RAM as ram FROM TBD_ATM WHERE ID_ATM = 5`
    )
      .then(resultados => {
        var linha = resultados.recordsets[0][0];
        var ram = linha.ram;
        console.log(linha);
        console.log(ram);
        res.json({ ram : ram });
      })
      .catch(error => {
        console.log(error);
        res
          .status(400)
          .json({ error: `erro na consulta junto ao banco de dados ${error}` });
      });
  });

//cpu, hd, ram, processos
//json: variavel recebe o nome da router.get
router.get("/nomeCpu", (req, res, next) => {
    Database.query(
      `SELECT DESCRICAO_PROCESSADOR FROM TBD_ATM WHERE ID_ATM = 5`
    )
      .then(resultados => {
        var linha = resultados.recordsets[0][0];
        var nomeCpu = linha.DESCRICAO_PROCESSADOR;
        res.json({ cpu : nomeCpu });
      })
      .catch(error => {
        console.log(error);
        res
          .status(400)
          .json({ error: `erro na consulta junto ao banco de dados ${error}` });
      });
  });

  router.get("/hd", (req, res, next) => {
    Database.query(
      `SELECT TOTAL FROM TBD_HD WHERE ID_ATM = 5`
    )
      .then(resultados => {
        var linha = resultados.recordsets[0][0];
        var hd = linha.TOTAL;
        console.log(hd);
        console.log(linha);
        res.json({ hd : hd });
      })
      .catch(error => {
        console.log(error);
        res
          .status(400)
          .json({ error: `erro na consulta junto ao banco de dados ${error}` });
      });
  });

  //nome do usuário
  router.get("/nomeBanco", (req, res, next) => {
    Database.query(
      console.log('pega o nome do banco')
      `SELECT NOMEBANCO FROM TBD_BANCO WHERE IDBANCO = 1`
    )
      .then(resultados => {
        let linha = resultados.recordsets[0][0];
        let nomeBanco = linha.NOMEBANCO;
        console.log(linha, nomeBanco);
        res.json({ nomeBanco : nomeBanco });
      })
      .catch(error => {
        console.log(error);
        res
          .status(400)
          .json({ error: `erro na consulta junto ao banco de dados ${error}` });
      });
  });


  //dados para o grafico

 /* router.get("/dadosQuase", (req, res, next) => {
    Database.query(
      console.log('HD E CPU')
      `SELECT H.PORCETAGEM_USO as HD_QTDUSO, 
      M.PORCENTAGEM_USO AS MEM_PORCUSO
  FROM TBD_HD H
  INNER JOIN TBD_MEMORIA M
      ON M.ID_ATM = H.ID_ATM where M.ID_ATM = 5`
    )
      .then(resultados => {
        let linha = resultados.recordsets[0][0];
        let porcHd = linha.HD_QTDUSO;
        let porcMem = linha.MEM_PORCUSO
        //console.log(linha, nomeBanco);
        res.json({ porcMem : MEM_PORCUSO , porcHd : HD_QTDUSO });
      })
      .catch(error => {
        console.log(error);
        res
          .status(400)
          .json({ error: `erro na consulta junto ao banco de dados ${error}` });
      });
  });

*/

  router.get("/ultimasHD", (req, res, next) => {
      Database.query(
        `SELECT DISTINCT TOP 10 PORCETAGEM_USO, 
        DATA_CADASTRO
        FROM TBD_HD
      ORDER BY DATA_CADASTRO DESC`
      )
        .then(resultados => {
          resultados = resultados.recordsets[0];
         // ultimo = resultados[9].idDado;
          //primeiro = resultados[0].idDado;
          //console.log(resultados);
          res.json(resultados);
        })
        .catch(error => {
          console.log(error);
          res
            .status(400)
            .json({ error: `erro na consulta junto ao banco de dados ${error}` });
        });
  }); 

  router.get("/ultimasCPU", (req, res, next) => {
    Database.query(
      `SELECT DISTINCT TOP 10 PORCENTAGEM_USO, 
      DATA_CADASTRO
      FROM TBD_PROCESSADOR
      ORDER BY DATA_CADASTRO DESC`
    )
      .then(resultados => {
        resultados = resultados.recordsets[0];
       // ultimo = resultados[9].idDado;
        //primeiro = resultados[0].idDado;
        //console.log(resultados);
        res.json(resultados);
      })
      .catch(error => {
        console.log(error);
        res
          .status(400)
          .json({ error: `erro na consulta junto ao banco de dados ${error}` });
      });
}); 

router.get("/ultimasRam", (req, res, next) => {
  Database.query(
    `SELECT DISTINCT TOP 10 PORCENTAGEM_USO, 
    DATA_CADASTRO
    FROM TBD_MEMORIA
    ORDER BY DATA_CADASTRO DESC`
  )
    .then(resultados => {
      resultados = resultados.recordsets[0];
     // ultimo = resultados[9].idDado;
      //primeiro = resultados[0].idDado;
      //console.log(resultados);
      res.json(resultados);
    })
    .catch(error => {
      console.log(error);
      res
        .status(400)
        .json({ error: `erro na consulta junto ao banco de dados ${error}` });
    });
}); 


module.exports = router;