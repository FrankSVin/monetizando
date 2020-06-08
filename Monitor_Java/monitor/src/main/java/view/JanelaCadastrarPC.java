/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package view;

import aplicacao.App;
import controller.ATMController;
import java.awt.Color;
import java.awt.Font;
import javax.swing.JComboBox;
import model.Usuario;
import controller.AgenciaController;
import controller.NotificacaoController;
import java.awt.Cursor;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JTextArea;

/**
 *
 * @author Aluno
 */
public class JanelaCadastrarPC extends JanelaPadrao implements ActionListener {

    private JLabel lblSecionarAgencia = null;
    private JComboBox jcbListaAgencia;
    private JButton btnCadastrarPc = null;
    private Usuario usuario;

    public JanelaCadastrarPC(Usuario usuario) {

        if (usuario == null) {
            new JanelaLogin("É preciso estar logado para acessar esta tela!");
            this.dispose();
        }
        this.usuario = usuario;
        this.carregarComboBox(jcbListaAgencia, usuario.getId());

    }

    @Override
    public void ij() {
        this.setTitle("MONE(TI)ZANDO - Cadastro ATM");
        this.setResizable(false);
        this.setSize(600, 400);
        this.getContentPane().setBackground(Color.WHITE);
    }

    @Override
    public void ic() {

        lblSecionarAgencia = new JLabel("selecionar ATM");
        lblSecionarAgencia.setBounds(25, 25, 200, 30);
        lblSecionarAgencia.setFont(new Font("Century Gothic", 0, 15));
        lblSecionarAgencia.setForeground(Color.BLACK);
        this.add(lblSecionarAgencia);

        jcbListaAgencia = new JComboBox();
        jcbListaAgencia.setBounds(25, lblSecionarAgencia.getY() + lblSecionarAgencia.getHeight() + 7, 550, 30);
        jcbListaAgencia.setBorder(null);
        jcbListaAgencia.setOpaque(true);
        jcbListaAgencia.setBackground(Color.WHITE);
        jcbListaAgencia.setFont(new Font("Century Gothic", 0, 15));
        jcbListaAgencia.setForeground(Color.BLACK);
        jcbListaAgencia.setFocusable(false);
        jcbListaAgencia.setOpaque(true);
        this.add(jcbListaAgencia);

        btnCadastrarPc = new JButton("Cadastrar PC");
        btnCadastrarPc.setBounds(this.getWidth() - 205, this.getHeight() - 80, 180, 30);
        btnCadastrarPc.setFont(new Font("Century Gothic", 0, 15));
        btnCadastrarPc.setForeground(Color.BLACK);
        btnCadastrarPc.setOpaque(true);
        btnCadastrarPc.setBackground(Color.green);
        btnCadastrarPc.setBorder(null);
        btnCadastrarPc.setCursor(new Cursor(Cursor.HAND_CURSOR));
        btnCadastrarPc.addActionListener(this);
        this.add(btnCadastrarPc);
    }

    public void carregarComboBox(JComboBox jcb, int idUsuario) {
        jcb.addItem("-- Selecione uma agencia --");
        new AgenciaController().labs(idUsuario).forEach(ag -> {
            jcb.addItem(ag.getIdAgencia() + " - Nome: " + ag.getNome() + " | Agencia: " + ag.getAgencia());
        });

    }

    @Override
    public void actionPerformed(ActionEvent e) {

        int lab = this.getIdLab();
        if (lab != -1) {
            System.out.println("inicio "+usuario.getEmail());
            //JOptionPane.showOptionDialog(this, this, "cadastro de pc", 200, 50, null, null, NORMAL);
            JOptionPane.showMessageDialog(this, new ATMController().cadastroInicial(lab, usuario.getId()));
            System.out.println("fim");
            this.setVisible(false);
            JOptionPane.showMessageDialog(this, "Iniciando a coleta de dados...");
            new ATMController().coletarInformacoes();
            new NotificacaoController().novaMaquina();

        } else {
            JOptionPane.showMessageDialog(this, "selecione uma Agência: ");

        }

    }

    public int getIdLab() {

        if (jcbListaAgencia.getSelectedIndex() != 0) {
            String textoCombo = jcbListaAgencia.getSelectedItem().toString();
            return Integer.parseInt(textoCombo.split("-")[0].trim());
        } else {
            return -1;
        }

    }

}
