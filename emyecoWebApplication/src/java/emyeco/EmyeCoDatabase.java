package emyeco;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 //package Emy CO;

import java.util.*;
import java.io.*;
import java.net.*;

public class EmyeCoDatabase{

  static int route = 0;
  static int r = 0;
  static  Socket socketClient;
  
  static  String domainName ="192.168.56.1";
  static int port = 49760;
  static int count = 0;
  static int track = 0;
  private static String system_out_print_count1 ="system_out_print_count1";
  private static String system_out_print_count ="system_out_print_count";
  private static String system_out_print_logging ="system_out_print_logging";
  private static String system_out_print_providing_request ="system_out_print_providing_request";
  private static String system_out_println_server_wating ="system_out_println_server_wating";
  private static String system_out_print_user ="system_out_print_user";
  private static String system_out_print_response ="system_out_print_response";
  private static String system_out_print_sending_requests ="system_out_print_sending_requests";
  private static String system_out_print_response1 ="system_out_print_response1";
  private static String system_out_print_enter_string ="system_out_print_enter_string";
  private static String system_out_print_enter_waiting_to_receive ="system_out_print_enter_waiting_to_receive";
  private static String system_out_print_enter_received ="system_out_print_enter_received";
  private static String system_out_print_enter_serverString ="system_out_print_enter_serverString";
  private static String system_out_print_enter_connection_failed ="system_out_print_enter_connection_failed";
  private static String nextLine ="";
  private static String nextLine1 ="";
  private static int sql = 0;
  public static String done ="";
  public static String info ="";
  public static String whoIs = "";

/** create a socket */

  public EmyeCoDatabase(int sql){
     track++;
     System.out.println("Track EmyeCoDatabase " + track);
     count++;
         system_out_print_count1 = "\ncount " + count + "\n";
                 System.out.println(system_out_print_count1);

                  
      switch(sql){

       case 1:
              System.out.println("selecting all....");
              select_all();
              System.out.println("Command completed");
              break;
       
       case 3:
              System.out.println("Signing up...");
              sign_up(Sign_up.getid(),Sign_up.getemail(),Sign_up.getpassword(),Sign_up.getfirstNmae(),Sign_up.getlastName(),Sign_up.getaddress(),Sign_up.getcity());
              System.out.println("Command completed");
              break;

       case 4: 
              System.out.println("Signing in...");      
              sign_in(Sign_in.getemail(),Sign_in.getpassword());
              System.out.println("Command completed");
              break;    

       default:
              System.out.println(sql + " Command connot be completed");
              info = "Command connot be completed";
              done=info; 
              break;
       } 
          
       if (done.equals("Done"))  

        callClientSocket();
        System.out.println("Socket " + "closed");
        
       }
  
  public static void main(String[] args){
  System.out.println("Track main " + track);

  EmyeCoDatabase.main(3);

      
     // nextLine = "karitu";
     // nextLine1 = "SELECT * FROM People";
      //sql = 1;
     //  sql = 3;
    //  done = "Done";
     //System.out.println("Track register before " + track);

     // Sign_up.register();
    // System.out.println("Track register after " + track);
     // sign_in.login();
        //   System.out.println("Track EmyeCoDatabase before " + track);

    //  new EmyeCoDatabase();
       //    System.out.println("Track EmyeCoDatabase after " + track);

  
  }
  public static void main(int sqlcomand){
     System.out.println("Track main sql " + track);

      
      nextLine = "karitu";
       sql = sqlcomand;
      done = "Done";
         System.out.println("Track EmyeCoDatabase before " + track);

      new EmyeCoDatabase(sql);
           System.out.println("Track EmyeCoDatabase after " + track);

  
  }


  public static void select_all(){
     System.out.println("Track select all " + track);
      
      nextLine = "karitu";
      nextLine1 = "SELECT * FROM People";
      sql = 1;
      done = "Done";

      
  
  }


  public static void sign_in(String email, String password){
         System.out.println("Track sign in " + track);

     
      nextLine = "karitu";
      nextLine1 = "SELECT Email,Password FROM People WHERE Email='" + email + "' AND Password= '" + password + "'";
      //sql = 2;
      sql = 4;
      done = "Done";
     // new EmyeCoDatabase();

  }

  public static void sign_up(int id, String email, String password, String firstNmae, String lastName, String address, String city){
     System.out.println("Track sign up " + track);

      nextLine = "karitu";
      nextLine1 = "INSERT INTO People(ID,Email,Password,FirstName,LastName,Address,City) VALUES (" + id + "," + email + "," + password + "," + firstNmae + "," + lastName + "," + address + "," + city + ")";
      sql = 3;
      done = "Done";
      //new EmyeCoDatabase();


  }


  
  public String getsystem_out_print_count1(){
  
      return system_out_print_count1;
  }
  public String getsystem_out_print_count(){
 
      return system_out_print_count;
  }  
  public String getsystem_out_print_logging(){
  
      return system_out_print_logging;
  }
  public String getsystem_out_print_providing_request(){
  
      return system_out_print_providing_request;
  }
  public String getsystem_out_println_server_wating(){
  
      return system_out_println_server_wating;
  }
  public String getsystem_out_print_user(){
  
      return system_out_print_user;
  }
  public void setnextLine(String nextLine){
     
     this.nextLine = nextLine;
  }  
  public String getsystem_out_print_response(){
  
      return system_out_print_response;
  }
  public String getsystem_out_print_sending_requests(){
  
      return system_out_print_sending_requests;
  }
  public String getsystem_out_print_response1(){
  
      return system_out_print_response1;
  }
  public String getsystem_out_print_enter_string(){
  
      return system_out_print_enter_string;
  }
  public void setnextLine1(String nextLine, int sql){
     
     this.nextLine1 = nextLine;
     this.sql = sql;
  }
  public String getsystem_out_print_enter_waiting_to_receive(){
  
      return system_out_print_enter_waiting_to_receive;
  }
  public String getsystem_out_print_enter_received(){
  
      return system_out_print_enter_received;
  }
  public String getsystem_out_print_enter_serverString(){
  
      return system_out_print_enter_serverString;
  }
  public String getsystem_out_print_enter_connection_failed(){
  
      return system_out_print_enter_connection_failed;
  }
  public String getnextLine(){
  
      return nextLine;
  }
   public String getnextLine1(){
  
      return nextLine1;
  }
/** new connection to the server */

  public static void callClientSocket(){
         System.out.println("Track new connection to the server " + track);

     clientSocket();
  }

/** connecting seckect */



  static int packets = 0;

  
  public static void clientSocket(){
         System.out.println("Track connecting socket " + track);

     
     // while(packets<1)
      clientSocketStart();
  
  }


  
    public static void clientSocketStart(){
    packets++;

    int x = 0;

    try{

      if (route == 1){
        socketClient.close(); //close any opened connection
        route = 0;

         count++;
         system_out_print_count = "\ncount " + count + "\n";
        System.out.println(system_out_print_count);
        system_out_print_logging ="Logging in...";
        System.out.println(system_out_print_logging);
      }

     // String domainName = "212.49.70.49";// "desktop-l7g6702";
     // int port = 49760;
      System.out.println("Attempting connection to " + domainName + " at " + port + "...");

      socketClient = new Socket(domainName, port);
      
      if (r == 0){
          System.out.println("Sockect opened\n " + packets + " packets(s) sent\n ");
          system_out_print_providing_request = "Providing request to the server...";
      System.out.println(system_out_print_providing_request);
      }

      InputStream serverInput = socketClient.getInputStream();
      OutputStream serverOutput = socketClient.getOutputStream();

      DataInputStream serverDataInput = new DataInputStream(serverInput);
      DataOutputStream serverDataOutput = new DataOutputStream(serverOutput);

      Reader fromServer = new InputStreamReader(socketClient.getInputStream());
      BufferedReader buffer = new BufferedReader(fromServer);

      
      PrintWriter printWrite = new PrintWriter(socketClient.getOutputStream());
      Scanner scan = new Scanner(System.in);   
       
      if (r == 0){
           system_out_println_server_wating = "Server wating for the call...";
      System.out.println(system_out_println_server_wating);
      }
 
    /** First call the server to listen the user */
    system_out_print_user = "User:\\ ";
    
    while(true){
      System.out.print(system_out_print_user);
      printWrite.println(nextLine);
      printWrite.flush();

      /** Server response to the user */

      int no = serverDataInput.read();
      String response = buffer.readLine();
      if(no == 0){ 
            system_out_print_response = response;
                 System.out.println(system_out_print_response);

        r = 1;
        route = 1; // close connection
        break;
      }
      else {
        x = 1;
         system_out_print_response = response;
                 System.out.println(system_out_print_response);

        break;
      }
    } //end of while loop

    /** reaconnect if login fail*/

    if (x == 0){
      route = 1; //close connection
      callClientSocket();
    }












         /** Sending requests to the server */
     system_out_print_sending_requests = "Sending requests to the server...";
                 System.out.println(system_out_print_sending_requests);

                       System.out.println("Track requests " + track + ": " + nextLine1);


       
       
        System.out.println();



        serverDataOutput.write(1);
        serverDataOutput.flush();



        printWrite.write(sql); // sql decision
        printWrite.flush();

       


        String name = "Stephen";
        printWrite.println(name);
        printWrite.flush();




      String response = buffer.readLine();
      system_out_print_response1 = response;
                 System.out.println(system_out_print_response1);


      System.out.println();
      system_out_print_enter_string = "Enter String";
                 System.out.println(system_out_print_enter_string);                 

        printWrite.println(nextLine1);
        printWrite.flush();

        


       System.out.println();
       system_out_print_enter_waiting_to_receive = "Waiting to receive service from the server...";
                 System.out.println(system_out_print_enter_waiting_to_receive);
        
      String serverString;
      int c = serverDataInput.read();
      serverString = buffer.readLine();
      int rounds = 0; 
      while(true){
        rounds++;         
        System.out.println("rounds: " + rounds);
        system_out_print_enter_received = "Received " + c + ".";
                 System.out.println(system_out_print_enter_received);
        
        //System.out.println(serverString);
        system_out_print_enter_serverString = serverString;
                 System.out.println(system_out_print_enter_serverString);
        
        serverString = buffer.readLine();
        break;
      }







      
      route = 1; // close connection
     // callClientSocket();
    }
    catch(IOException e){
         system_out_print_enter_connection_failed = "Attempt to create connection failed with error: " + e;
                 System.out.println(system_out_print_enter_connection_failed);
        
    System.out.println();
    //callClientSocket();
    } 

  }

  




}