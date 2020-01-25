/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package emyeco;

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
@WebServlet(name = "EmyecoStocksAI", urlPatterns = {"/EmyecoStocksAI"})
public class EmyecoStocksAI extends HttpServlet {
    
    private String sell = "";
    private String buy = "";
    private String static_price = "";
    private String your_prediction = "";
    
    public String getSell(){
    
        return sell;
    }
    public String getBuy(){
    
        return buy;
    }
    public String getStatic_price(){
    
        return static_price;
    }
    public String getYour_prediction(){
    
        return your_prediction;
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
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            
             
            EmyecoStockAnalysis stocks = new  EmyecoStockAnalysis();
            stocks.predict(sell, static_price, buy, your_prediction);
            
            out.println("<meta HTTP-EQUIV=\"REFRESH\" content=\"0;url=emyecostocksAI.html#result\"/>");
            out.println("<script src=\"http://localhost:8000/server_sent_events.js\"></script>");
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
                sell = request.getParameter("sell");
                buy = request.getParameter("buy");
                static_price = request.getParameter("static_price");
                your_prediction = request.getParameter("your_prediction");
               // new EmyecoWriteFile();
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
                sell = request.getParameter("sell");
                buy = request.getParameter("buy");
                static_price = request.getParameter("static_price");
                your_prediction = request.getParameter("your_prediction");
              //  new EmyecoWriteFile();
        processRequest(request, response);
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
