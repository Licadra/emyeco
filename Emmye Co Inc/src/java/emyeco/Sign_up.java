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

import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

/**
 *
 * @author Karitu Pavilion
 */
@WebServlet(urlPatterns = {"/Sign_up"})
public class Sign_up extends HttpServlet {
    
     private static Database database_request = new Database();
     private static int id ;
     private static String email =""; 
     private static String password =""; 
     private static String firstNmae =""; 
     private static String lastName =""; 
     private static String address =""; 
     private static String city ="";
     private static String done = register();
    
     
     
     

    
    
    

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        
        
        
        
       
      
        
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Emy CO Client</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Emy CO Client</h1>");
            
            out.println("<h1>Servlet task " + database_request.done + "</h1>");
            out.println("<h1>Servlet nextLine task " + database_request.getnextLine() + "</h1>");
            out.println("<h1>Servlet nextLine1 task " + database_request.getnextLine1() + "</h1>");
            
            database_request.callClientSocket();
            
            out.println("<h1>Servlet " + database_request.getsystem_out_print_count1() + "</h1>");
            out.println("<h1>Servlet " + database_request.getsystem_out_print_count1() + "</h1>");
            
            out.println("<h1>Servlet Client at " + database_request.getsystem_out_print_count1() + "</h1>");
            out.println("<h1>Servlet Client at " + database_request.getsystem_out_print_count() + "</h1>");
            out.println("<h1>Servlet Client at " + database_request.getsystem_out_print_logging() + "</h1>");
            out.println("<h1>Servlet Client at " + database_request.getsystem_out_print_providing_request() + "</h1>");
            out.println("<h1>Servlet Client at " + database_request.getsystem_out_println_server_wating() + "</h1>");
            out.println("<h1>Servlet Client at " + database_request.getsystem_out_print_response() + "</h1>");
            out.println("<h1>Servlet Client at " + database_request.getsystem_out_print_sending_requests() + "</h1>");
            out.println("<h1>Servlet Client at " + database_request.getsystem_out_print_response1() + "</h1>");
            out.println("<h1>Servlet Client at " + database_request.getsystem_out_print_enter_string() + "</h1>");
            out.println("<h1>Servlet Client at " + database_request.getsystem_out_print_enter_waiting_to_receive() + "</h1>");
            out.println("<h1>Servlet Client at " + database_request.getsystem_out_print_enter_received() + "</h1>");
            out.println("<h1>Servlet Client at " + database_request.getsystem_out_print_enter_serverString() + "</h1>");
            out.println("<h1>Servlet Client at " + database_request.getsystem_out_print_enter_connection_failed() + "</h1>");
            out.println("<h1>" + getServletInfo() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
       
    }

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
        database_request.done = done;
        processRequest(request, response);
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
        database_request.done = done;
        processRequest(request, response);
    }
    
        public static String register() {
             String donee = "";

       
            try{
                  
                Scanner scan = new Scanner(new File("C:\\Users\\Pavilion\\Documents\\GitHub\\Emmye Co Inc\\src\\java\\emyeco\\registerFile.txt"));
                
                id = scan.nextInt();
                email = scan.nextLine();
                password = scan.nextLine();
                firstNmae = scan.nextLine();
                lastName = scan.nextLine();
                address = scan.nextLine();
                city = scan.nextLine();

               // database_request.sign_in(username,password);
               // donee ="Done"
            }
            catch(FileNotFoundException file){
                System.out.println("File Exception thrown: " +file);
                donee = "File Exception thrown: " + file;
            }
           

            database_request.sign_up(id,email,password,firstNmae,lastName,address,city);
                //donee ="Done"

             
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
