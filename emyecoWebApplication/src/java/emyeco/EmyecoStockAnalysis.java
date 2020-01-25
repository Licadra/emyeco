/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package emyeco;


import weka.classifiers.meta.FilteredClassifier;
import weka.classifiers.trees.J48;
import weka.core.Instances;
import weka.filters.unsupervised.attribute.Remove;

import java.io.BufferedReader;
import java.io.FileReader;

/**
 * Stock analysis using Emyeco
 *
 * <p/>
 * 
 *
 * @author Karitu Pavilion
 *
 * Copyright 2000-2012 by Mark Watson. All rights reserved.
 * <p/>
 * This software is can be used under either of the following licenses:
 * <p/>
 * 1. LGPL v3<br/>
 * 2. Apache 2
 * <p/>
 */

public class EmyecoStockAnalysis extends EmyecoWriteFile{
    
      private static String given_value = "";
      private static String predicted_value ="";
      private static String error = "";
      
      //private String sell  = "";
      //private String static_price = "";
      //private String buy = "";
      //private String your_prediction = "";
      
    //  public void setsell(String sell){
     //     this.setsell(sell);// = sell;
     // }
     // public void setstatic_price(String static_price){
      //    this.setstatic_price (static_price);// = static_price;
     // }
     // public void setbuy(String buy){
     //     this.setbuy(buy);// = buy;
     // }
      //public void setyour_prediction(String your_prediction){
      //    this.setyour_prediction(your_prediction);// = your_prediction;
     // }
      
      
      public void predict(String sell,String static_price,String buy,String your_prediction){
      
          this.setsell(sell);
          this.setstatic_price (static_price);
          this.setbuy(buy);
          this.setyour_prediction(your_prediction);
          this.mainWrite();
          try{
              //this.mainWrite();
            //  new EmyecoWriteFile();
              mainRead();
          }
          catch(Exception e){
              
              System.out.println(e);
          }
          
      }
      
      
      
     
      
      
      
      
      
      
      
      
      
      
     
      public String getGiven_value(){
      
          return given_value;
      }
      public String getPredicted_value(){
      
          return predicted_value;
      }
      public String getError(){
      
          return error;
      }
     /** 
      public EmyecoStockAnalysis(){
          try{
            //  new EmyecoWriteFile();
              mainRead();
          }
          catch(Exception e){
              System.out.println(e);
          }
      }
      * /

	/**
	// * @param args
	 * @throws Exception 
	 */
	public static void mainRead() throws Exception {
		Instances training_data = new Instances(
                new BufferedReader(
                      new FileReader("C:\\Users\\Pavilion\\Documents\\GitHub\\emyeco\\emyecoWebApplication\\src\\java\\emyeco\\test_data\\stock_training_data.arff")));
		training_data.setClassIndex(training_data.numAttributes() - 1);

		Instances testing_data = new Instances(
                new BufferedReader(
                      new FileReader("C:\\Users\\Pavilion\\Documents\\GitHub\\emyeco\\stock_data.arff")));
		testing_data.setClassIndex(training_data.numAttributes() - 1);

		String summary = training_data.toSummaryString();
		int number_samples = training_data.numInstances();
		int number_attributes_per_sample = training_data.numAttributes();
        System.out.println("Number of attributes in model = " + number_attributes_per_sample);
        System.out.println("Number of samples = " + number_samples);
        System.out.println("Summary: " + summary);
        System.out.println();
        
        // a classifier for decision trees:
        J48 j48 = new J48();
        
        // filter for removing samples:
        Remove rm = new Remove();
        rm.setAttributeIndices("1");  // remove 1st attribute

        // filtered classifier
        FilteredClassifier fc = new FilteredClassifier();
       
        fc.setFilter(rm);
        fc.setClassifier(j48);
        // train using stock_training_data.arff:
        fc.buildClassifier(training_data);
        // test using stock_testing_data.arff:
        for (int i = 0; i < testing_data.numInstances(); i++) {
          double pred = fc.classifyInstance(testing_data.instance(i));
         // given_value = "given value: " + testing_data.classAttribute().value((int)testing_data.instance(i).classValue());
          given_value = testing_data.classAttribute().value((int)testing_data.instance(i).classValue());
          System.out.print("given value: " + given_value);
         // predicted_value = ". predicted value: " + testing_data.classAttribute().value((int) pred);
          predicted_value =testing_data.classAttribute().value((int) pred);
          System.out.println("predicted value: " + predicted_value);
         // EmyecoWriteJson.writeEmyecoStockPredictions(predicted_value, given_value);
        }

	}

}

