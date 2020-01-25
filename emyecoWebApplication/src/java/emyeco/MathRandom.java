/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package emyeco;

/**
 *
 * @author Karitu Pavilion
 */
public class MathRandom {

    /**
     * @return port number in five significant figures
     */
    public static int port() {
        double port = Math.random()*10000;
        int portNo = (int)port;
        return portNo;
       
        // TODO code application logic here
    }
    
}
