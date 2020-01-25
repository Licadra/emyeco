package emyeco;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



/**
 *
 * @author Karitu Pavilion
 */
@WebServlet(name = "Sign_up",urlPatterns = {"/Sign_up"})
public class Sign_up extends HttpServlet {


    
    
     private static int id ;
     private static String email =""; 
     private static String password =""; 
     private static String firstNmae =""; 
     private static String lastName =""; 
     private static String address =""; 
     private static String city ="";
     private static String donee ="";//ScanRegisterFile.scanFile();

     /**
     public static class ScanRegisterFile {
         public static String scanFile(){
    
            try{
                  
                Scanner scan = new Scanner(new File("C:\\Users\\Pavilion\\Documents\\GitHub\\emyeco\\emyecoPhp\\registerFile.txt"));
                Scanner scanInt = new Scanner(new File("C:\\Users\\Pavilion\\Documents\\GitHub\\emyeco\\emyyeco\\src\\java\\emyeco\\registerFileInt.txt"));

                id = scanInt.nextInt();
                email = scan.nextLine();
                password = scan.nextLine();
                firstNmae = scan.nextLine();
                lastName = scan.nextLine();
                address = scan.nextLine();
                city = scan.nextLine();

               // database_request.sign_in(username,password);
                donee ="File scan completed";
            }
            catch(FileNotFoundException file){
                System.out.println("File Exception thrown: " +file);
                donee = "File Exception thrown: " + file;
            }
            
            return donee;
         }
            
      }
      */




     //private static String done = register();
   //  private static EmyeCoDatabase database_request = new EmyeCoDatabase();

    

     public static int getid(){
         return id;
     }
     public static String getemail(){
         return email;
     }
     public static String getpassword(){
         return password;
     }
     public static String getfirstNmae(){
         return firstNmae;
     }
     public static String getlastName(){
         return lastName;
     }
     public static String getaddress(){
         return address;
     }
     public static String getcity(){
         return city;
     }
     
     public static String getdonee(){
         return donee;

     }
    
     
     
     

    
    
    

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
       /**
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

             database_request.done = register();
        
        
        */
     
        
        
      /**   
      
        
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
        */  //  /* TODO output your page here. You may use following sample code. */
         /**     out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Emye CO Client</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Emye CO Client</h1>");
            
            out.println("<h2><strong>Your input</strong>" + "</h2>");
            out.println("<h3><strong>first Name: </strong>" + firstNmae + "</h3>");
            out.println("<h3><strong>last Name: </strong>" + lastName + "</h3>");
            out.println("<h3><strong>e-mail: </strong>" + email + "</h3>");
            out.println("<h3><strong>password: </strong>" + password + "</h3>");
            out.println("<h3><strong>address: </strong>" + address + "</h3>");
            out.println("<h3><strong>city: </strong>" + city + "</h3>");

            out.println("<h4>Servlet task " + database_request.done + "</h4>");
            out.println("<h4>Servlet nextLine task " + database_request.getnextLine() + "</h4>");
            out.println("<h4>Servlet nextLine1 task " + database_request.getnextLine1() + "</h4>");
            
            database_request.callClientSocket();
            
            out.println("<h4>Servlet " + database_request.getsystem_out_print_count1() + "</h4>");
            out.println("<h4>Servlet " + database_request.getsystem_out_print_count1() + "</h4>");
            
            out.println("<h4>Servlet Client at " + database_request.getsystem_out_print_count1() + "</h4>");
            out.println("<h4>Servlet Client at " + database_request.getsystem_out_print_count() + "</h4>");
            out.println("<h4>Servlet Client at " + database_request.getsystem_out_print_logging() + "</h4>");
            out.println("<h4>Servlet Client at " + database_request.getsystem_out_print_providing_request() + "</h4>");
            out.println("<h4>Servlet Client at " + database_request.getsystem_out_println_server_wating() + "</h4>");
            out.println("<h4>Servlet Client at " + database_request.getsystem_out_print_response() + "</h4>");
            out.println("<h4>Servlet Client at " + database_request.getsystem_out_print_sending_requests() + "</h4>");
            out.println("<h4>Servlet Client at " + database_request.getsystem_out_print_response1() + "</h4>");
            out.println("<h4>Servlet Client at " + database_request.getsystem_out_print_enter_string() + "</h4>");
            out.println("<h4>Servlet Client at " + database_request.getsystem_out_print_enter_waiting_to_receive() + "</h4>");
            out.println("<h4>Servlet Client at " + database_request.getsystem_out_print_enter_received() + "</h4>");
            out.println("<h4>Servlet Client at " + database_request.getsystem_out_print_enter_serverString() + "</h4>");
            out.println("<h4>Servlet Client at " + database_request.getsystem_out_print_enter_connection_failed() + "</h4>");
            out.println("<h4>" + getServletInfo() + "</h4>");
            out.println("</body>");
            out.println("</html>");
        }
       
    }
*/
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
              
                firstNmae = request.getParameter("firstname");
                lastName = request.getParameter("username");
                email = request.getParameter("email");
                Boolean isEmail = EmailValidation.isValid(getemail());
                password = request.getParameter("password");
                String confirmpassword = request.getParameter("confirmpassword");
                address = request.getParameter("address");
                city = request.getParameter("city");
                 if (! password.equals(confirmpassword)){
                     // get response writer
                    PrintWriter writer = response.getWriter();
         
                   // build HTML code
                  String htmlRespone = "<html>";
                  htmlRespone += "<h2>Your password do not match" + "<br/>";      
                  htmlRespone += "</h2>";    
                  htmlRespone += "</html>";
         
                  // return response
                  writer.println(htmlRespone);
                 }
                 else if(isEmail.equals(false)){
                     // get response writer
                    PrintWriter writer = response.getWriter();
         
                   // build HTML code
                  String htmlRespone = "<html>";
                  htmlRespone += "<h2>Invalid email format" + "<br/>" + "</h2>";
                  htmlRespone += "<h3>Valid format: user@domain.com" + "<br/>" + "</h3>";      
                  htmlRespone += "</html>";
         
                  // return response
                  writer.println(htmlRespone);
                 }  
                 else{
                   register();
                      // get response writer
                    PrintWriter writer = response.getWriter();
         
                   // build HTML code
                  String htmlRespone = "<html>";
                  htmlRespone += "<h2>" + donee + "</h2>";
                  htmlRespone += "</html>";
         
                  // return response
                  writer.println(htmlRespone);
        
                //  processRequest(request, response);

        
               //   processRequest(request, response);

                 }
        
       
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
                firstNmae = request.getParameter("firstname");
                lastName = request.getParameter("username");
                email = request.getParameter("email");
                Boolean isEmail = EmailValidation.isValid(getemail());
                password = request.getParameter("password");
                String confirmpassword = request.getParameter("confirmpassword");
                address = request.getParameter("address");
                city = request.getParameter("city");
                 if (! password.equals(confirmpassword)){
                     // get response writer
                    PrintWriter writer = response.getWriter();
         
                   // build HTML code
                  String htmlRespone = "<html>";
                  htmlRespone += "<h2>Your password do not match" + "<br/>";      
                  htmlRespone += "</h2>";    
                  htmlRespone += "</html>";
         
                  // return response
                  writer.println(htmlRespone);
                 }
                 else if(isEmail.equals(false)){
                     // get response writer
                    PrintWriter writer = response.getWriter();
         
                   // build HTML code
                  String htmlRespone = "<html>";
                  htmlRespone += "<h2>Invalid email format" + "<br/>" + "</h2>";
                  htmlRespone += "<h3>Valid format: user@domain.com" + "<br/>" + "</h3>";      
                  htmlRespone += "</html>";
         
                  // return response
                  writer.println(htmlRespone);
                 }        
                 
                 else{
                    register();
                      // get response writer
                    PrintWriter writer = response.getWriter();
         
                   // build HTML code
                  String htmlRespone = "<html>";
                  htmlRespone += "<h2>" + donee + "</h2>";
                  htmlRespone += "</html>";
         
                  // return response
                  writer.println(htmlRespone);
        
                //  processRequest(request, response);

                 }
    }
    
        public static String register() {

        //   new EmyeCoDatabase();
           
         //  database_request.main(3);

           // database_request.sign_up(id,email,password,firstNmae,lastName,address,city);
               // new EmyeCoDatabase(3);
               EmyeCoDatabase.main(3);
                donee ="Registered Successfully";

             
            return donee;
        }  

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        
        return "Short description";
    }// </editor-fold>

}
