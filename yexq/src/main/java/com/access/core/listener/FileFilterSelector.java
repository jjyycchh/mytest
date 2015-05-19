package com.access.core.listener;

import java.io.File;
import java.io.FileFilter;

public class FileFilterSelector implements FileFilter{
	
	String extension = ".";
	public FileFilterSelector(String fileExtensionNoDot){
		extension += fileExtensionNoDot;
	}
    public boolean accept(File f) {
        if (f != null && f.getName().toLowerCase().endsWith(extension)){
            return true;
        } 
        else {
            return false;
        }
    }

    public String getDescription(){
        return "Filter for all properties files.";
    }
}
