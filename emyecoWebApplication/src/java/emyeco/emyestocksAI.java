/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package emyeco;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
//import com.hmkcode.vo.Article;
/**
 *
 * @author Karitu Pavilion
 */
@WebServlet(name = "emyestocksAI", urlPatterns = {"/emyestocksAI"})
public class emyestocksAI extends HttpServlet {

	private static final long serialVersionUID = 1L;

	// This will store all received articles
	List<EmyecoAIStocks> emyecoAIstock = new LinkedList<EmyecoAIStocks>();
	
	/***************************************************
	 * URL: /emyestocksAI
	 * doPost(): receives JSON data, parse it, map it and send back as JSON
	 ****************************************************/
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
	        throws ServletException, IOException{
	    
		// 1. get received JSON data from request
		BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
		String json = "";
		if(br != null){
			json = br.readLine();
			System.out.println(json);
		}
		
		// 2. initiate jackson mapper
		ObjectMapper mapper = new ObjectMapper();
    	
		// 3. Convert received JSON to EmyecoAIStocks
		EmyecoAIStocks emyecoAIstocks = mapper.readValue(json, EmyecoAIStocks.class);

		// 4. Set response type to JSON
		response.setContentType("application/json");		    
    	
		// 5. Add emyecoAIstocks to List<EmyecoAIStocks>
		emyecoAIstock.add(emyecoAIstocks);

		// 6. Send List<EmyecoAIStocks> as JSON to client
		mapper.writeValue(response.getOutputStream(), emyecoAIstock);
	}
}
