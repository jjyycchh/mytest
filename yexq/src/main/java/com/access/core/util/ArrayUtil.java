package com.access.core.util;

import java.util.ArrayList;
import java.util.List;

public class ArrayUtil {

	public static List<String[]> allConbinations(String[] a) {
		
		List<String[]> allConbinations = new ArrayList<String[]>();
        for (int i = a.length; i > 0;i--) {
        	allConbinations.add(ArrayUtil.combine(a,i));  
        }
        
        return allConbinations;
	}
	
	public static String[] combine(String[] a, int n) {  
        
        if(null == a || a.length == 0 || n <= 0 || n > a.length)  
            return null;  
              
        String[] b = new String[n];
        return getCombination(a, n , 0, b, 0);  
    }  
  
    private static String[] getCombination(String[] a, int n, int begin, String[] b, int index) {  
        List<String> retList = new ArrayList<String>();
        
        if (n == 0) {
            for (int i = 0; i < index; i++){  
            	retList.add(b[i]);
            }  
 
            return (String[]) retList.toArray();  
        }  
              
        for(int i = begin; i < a.length; i++){  
              
            b[index] = a[i];  
            getCombination(a, n-1, i+1, b, index+1);  
        }
        
        return null;
    }  
      
    public static void main(String[] args){  
    	
    }  
}
