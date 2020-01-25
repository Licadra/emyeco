/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package emyeco;

public class EmailValidation {

 public static Boolean isValid(String args) {

  String EMAIL_REGEX = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
  String email1 = args;
  Boolean b = email1.matches(EMAIL_REGEX);
  //System.out.println("is e-mail: "+email1+" :Valid = " + b);
  //String email2 = "user^domain.co.in";
  //b = email2.matches(EMAIL_REGEX);
  //System.out.println("is e-mail: "+email2
  //+" :Valid = " + b);
  return b;
   }
 }