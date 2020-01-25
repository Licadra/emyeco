package emyeco;


import java.io.FileWriter;
import java.io.IOException;
 
import org.json.JSONArray;
import org.json.JSONObject;
 
public class EmyecoWriteJson
{
    @SuppressWarnings("unchecked")
    public static void writeEmyecoStockPredictions( String emyecoprediction, String yourprediction )
    {
        //First Employee
        JSONObject employeeDetails = new JSONObject();
        employeeDetails.put("emyecoAIprediction", emyecoprediction);
         
        JSONObject employeeObject = new JSONObject(); 
        employeeObject.put("stocksprediction", employeeDetails);
         
        //Second Employee
        JSONObject employeeDetails2 = new JSONObject();
        employeeDetails2.put("yourprediction", yourprediction);
         
        JSONObject employeeObject2 = new JSONObject(); 
        employeeObject2.put("stocksprediction", employeeDetails2);
         
        //Add employees to list
        JSONArray employeeList = new JSONArray();
        employeeList.put(employeeObject);
        employeeList.put(employeeObject2);
         
        //Write JSON file
        try (FileWriter file = new FileWriter("C:\\Users\\Pavilion\\Documents\\GitHub\\emyeco\\stocksprediction.json")) {

            file.write(employeeList.toString());
            file.flush();
 
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

