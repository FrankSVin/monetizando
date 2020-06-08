package controller;

import java.util.ArrayList;
import java.util.List;
import model.MAC;
import oshi.SystemInfo;
import oshi.hardware.NetworkIF;
import oshi.util.FormatUtil;

public class RedeController {

    private SystemInfo systemInfo = null;

    /**
     * @return Retorna a velocidade da rede em bits
     */
    public int getTotalInterfaces() {
        systemInfo = new SystemInfo();
        return systemInfo.getHardware().getNetworkIFs().length;
    }

    public List<MAC> getMacsPC() {
        systemInfo = new SystemInfo();
        int index = systemInfo.getHardware().getNetworkIFs().length;

        List<MAC> macs = new ArrayList<MAC>();

        for (int i = 0; i < index; i++) {
            macs.add(new MAC(systemInfo.getHardware().getNetworkIFs()[i].getMacaddr(),
                    systemInfo.getHardware().getNetworkIFs()[i].getDisplayName()));
        }

        return macs;
    }


    public String getMAC() {
        systemInfo = new SystemInfo();
        return systemInfo.getHardware().getNetworkIFs()[getInterfaceEmUso()].getMacaddr();
    }

    public String getAdaptadorDeRede() {
        systemInfo = new SystemInfo();
        return systemInfo.getHardware().getNetworkIFs()[getInterfaceEmUso()].getDisplayName();
    }

    private int getInterfaceEmUso() {
        systemInfo = new SystemInfo();

        for (int i = 0; i < systemInfo.getHardware().getNetworkIFs().length; i++) {
            if (systemInfo.getHardware().getNetworkIFs()[i].getBytesSent() > 0) {
                return i;
            }
        }

        return -1;
    }
    
    
    public void atualizarDadosRede(){
        systemInfo = new SystemInfo();
        systemInfo.getHardware().getNetworkIFs()[this.getInterfaceEmUso()].updateNetworkStats();
    }
    
    public String getMacParaCadastroInicial(){
        
        for(MAC mac: this.getMacsPC()){
                if(!mac.getAdaptador().toUpperCase().contains("VIRTUAL"))
                return mac.getMac();
        }
        return null;
    }

}
