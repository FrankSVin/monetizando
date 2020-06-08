/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

/**
 *
 * @author Aluno
 */
public class Agencia {
    private int idAgencia;
    private String nome;
    private String agencia;

    public Agencia(int idAgencia, String nome, String agencia) {
        this.idAgencia = idAgencia;
        this.nome = nome;
        this.agencia = agencia;
    }


    public int getIdAgencia() {
        return idAgencia;
    }

    public void setIdCaixa(int idAgencia) {
        this.idAgencia = idAgencia;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getAgencia() {
        return agencia;
    }

    public void setAndar(String agencia) {
        this.agencia = agencia;
    }

    
    
}
