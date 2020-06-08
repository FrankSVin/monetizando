/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package view;

import java.awt.event.ActionEvent;

import javax.swing.JFrame;

/**
 *
 * @author Aluno
 */
public abstract class JanelaPadrao extends JFrame{
 
    public JanelaPadrao(){
        
        ij();
        ic();
        
        this.setLocationRelativeTo(null);
        this.setLayout(null);
        this.setVisible(true);
        this.setDefaultCloseOperation(EXIT_ON_CLOSE);
    }
    
    public abstract void ij();
    public abstract void ic();

	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		
	}
}
