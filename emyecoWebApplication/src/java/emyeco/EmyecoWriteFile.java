/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package emyeco;

/**
 *
 * @author Karitu Pavilion
 * 
 * 
 */
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

import java.io.FileWriter;
import java.io.IOException;

public class EmyecoWriteFile {
    
      private static String sell  = "";
      private static String static_price = "";
      private static String buy = "";
      private static String your_prediction = "";
      
      public void setsell(String sell){
          this.sell = sell;
      }
      public void setstatic_price(String static_price){
          this.static_price = static_price;
      }
      public void setbuy(String buy){
          this.buy = buy;
      }
      public void setyour_prediction(String your_prediction){
          this.your_prediction = your_prediction;
      }
      
      
   /** 
    *public EmyecoWriteFile(){
    *    
    *    main();
    *}
    */
    /**
     * @param args the command line arguments
     */
    public static void mainWrite() {
        // TODO code application logic here
         //Write ARFF file
        try (FileWriter file = new FileWriter("C:\\Users\\Pavilion\\Documents\\GitHub\\emyeco\\stock_data.arff")) {
           // EmyecoStocksAI aiStock = new EmyecoStocksAI();
            String stock_data = "@relation stock" + "\n" + 
                                "\n" + 
                                "@attribute percent_change_since_open real" + "\n" +
                                "@attribute percent_change_from_day_low real" + "\n" +
                                "@attribute percent_change_from_day_high real" + "\n" +
                                "@attribute action {buy, sell, hold}" + "\n" +
                                "\n" +
                                "@data" + "\n" +
                                sell + "," + static_price + "," + buy + "," + your_prediction ;
            file.write(stock_data);
            file.flush();
           // new EmyecoStockAnalysis();
 
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
}
