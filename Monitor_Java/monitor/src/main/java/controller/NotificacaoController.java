package controller;

import aplicacao.App;
import com.github.seratch.jslack.Slack;
import com.github.seratch.jslack.api.webhook.Payload;
import com.github.seratch.jslack.api.webhook.WebhookResponse;
import model.Processador;
import model.MemoriaRam;
import oshi.SystemInfo;
import controller.ATMController;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import model.Computador;
import model.MAC;
import dao.AtmDAO;

public class NotificacaoController {

    Computador c = new Computador();
    List<MAC> mac = new RedeController().getMacsPC();
    int idAtm = new AtmDAO().getIdAtm(mac);
    int idAgencia = new AtmDAO().getIdAgencia(idAtm);
    

    public void enviarSlack(String texto) {
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = new Date();

        String url = "https://hooks.slack.com/services/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";

        Payload payload = Payload.builder()
                .channel("#suporte")
                .username("bruno.donatelli17")
                .iconEmoji(":smile_cat:")
                .text(texto + df.format(date))
                .build();

        Slack slack = Slack.getInstance();
        try {
            WebhookResponse response = slack.send(url, payload);
        } catch (IOException ex) {
            Logger.getLogger(App.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public boolean iniciarSistema() {
    	
        new NotificacaoController().enviarSlack("Sistema iniciado: ID ATM: " + idAtm + " ID AGENCIA: " + idAgencia + " ");
        return true;
    }

    public void usoProcessador() {
        new NotificacaoController().enviarSlack("Alto consumo do processador: ID ATM: " + idAtm + " ID AGENCIA: "  + idAgencia + " ");
    }

    public void usoMemoriaRAM() {
        new NotificacaoController().enviarSlack("Alto consumo de RAM: ID ATM: " + idAtm + " ID AGENCIA: "  + idAgencia + " ");
    }
    
    public void hdCheio() {
        new NotificacaoController().enviarSlack("HD quase cheio: ID ATM: " + idAtm + " ID AGENCIA: "  + idAgencia + " ");
    }

    public void novaMaquina() {
        new NotificacaoController().enviarSlack("Nova máquina cadastrada: ID ATM: " + idAtm + " ID AGENCIA: "  + idAgencia + " ");
    }
}
