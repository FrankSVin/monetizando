package aplicacao;

import controller.ATMController;
import controller.NotificacaoController;
import controller.RedeController;
import java.io.IOException;
import java.sql.SQLException;
//import java.util.Scanner;
import view.JanelaLogin;
import view.JanelaModelIniciandoMonitoramento;
//import view.JanelaNotificacao;

/**
 * @author Brino
 *
 */
public class App {

    public static void main(String[] args) throws InterruptedException, SQLException, IOException {
        
        if (new ATMController().isPcJaCadastrado(new RedeController().getMacsPC())) {
            new JanelaModelIniciandoMonitoramento();
            new log_Monet.ArquivoLogger("AUTO-LOGIN. Computador já cadastrado!");
            new ATMController().coletarInformacoes();
            new NotificacaoController().iniciarSistema();

        } else {
            new JanelaLogin();
            new log_Monet.ArquivoLogger("abrindo tela de login");
        }
    }
}
