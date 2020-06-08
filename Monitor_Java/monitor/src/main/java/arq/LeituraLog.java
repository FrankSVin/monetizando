package arq;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class LeituraLog {

    
    FileReader fileR;
    BufferedReader buff;
    

    public LeituraLog() 
    {
        
        try 
        {
             
          fileR = new FileReader("Log.txt");
          buff = new BufferedReader(fileR);
          
          while(buff.ready())
            {
             System.out.println(buff.readLine());
            }
          buff.close();
        }
         catch (FileNotFoundException ex)
        {
            System.out.println("...erro:  "+ex.getMessage());
        }
        catch(IOException er )
          {
        
          }
    }
    
	
}
