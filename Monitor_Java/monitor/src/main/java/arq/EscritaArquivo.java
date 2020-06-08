package arq;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;


public class EscritaArquivo {

    FileWriter fileR;
    BufferedWriter buff;
    

public EscritaArquivo() 

{
        try 
        {
            fileR = new FileWriter("Log.txt");
            buff = new  BufferedWriter(fileR);
            buff.write("Funciona: ");
            buff.newLine();
            buff.write("...Funcionou");
            buff.close();
            
        } 
        catch (IOException ex) {
            Logger.getLogger(EscritaArquivo.class.getName()).log(Level.SEVERE, null, ex);
        }


}
	
	
}
