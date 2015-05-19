package com.access.core.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.access.core.constant.Constants;

import net.coobird.thumbnailator.Thumbnails;

public class ThumbnailUtil {
	private static final String defaultWidth = "300";
	private static final String defaultHeight = "600";
	
	/**
	 * generate thumbnail and return relative access url with file name
	 * @param appContextURL must contain application name e.g. http://localhost:8090/twifi-access
	 * @param width
	 * @param height
	 * @throws IOException 
	 * @throws InterruptedException 
	 */
	public static Map<String, String> generateThumbForSite(String sourceURL, Long nWidth, Long nHeight) throws IOException, InterruptedException {
		String width = nWidth == null ? defaultWidth : nWidth.toString();
		String height = nHeight == null ? defaultHeight : nHeight.toString();

		String appAbsolutePath = PropertiesUtil.confProperties.getProperty("resource.root.applicationPath");//System.getProperty("user.dir");
		String thumbRelativePath = PropertiesUtil.confProperties.getProperty("resource.root.thumbScriptRelativePath");
		String script = appAbsolutePath + thumbRelativePath;
		
		String outFileName = UUID.randomUUID().toString() + ".jpg";
		String outFileFullPath = PropertiesUtil.confProperties.getProperty("resource.root.siteThumbPath") + File.separator + outFileName;
		String outThumbRelativeURL = PropertiesUtil.confProperties.getProperty("resource.root.siteThumbRelativeURL") + outFileName;
		
		String command = "python "+script+" "+ sourceURL +" "+width+" "+height+" "+outFileFullPath;
		
		System.out.println(command);
		Process p = Runtime.getRuntime().exec(command);
		p.waitFor();
	 
	    BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
	    
	    StringBuffer output = new StringBuffer();
	    
	    String line = "";			
	    while ((line = reader.readLine())!= null) {
	    	output.append(line + "\n");
	    }
		
		System.out.println(output.toString());
		String generationResult = output.toString();
		
		Map<String, String> returnValues = new HashMap<String, String>();
		returnValues.put("generationResult", generationResult);
		if (generationResult.contains(Constants.THUMB_GENE_STD_RESULT) && generationResult.contains(Constants.THUMB_RESIZE_SUCCESS)) {
			returnValues.put("outThumbRelativeURL", outThumbRelativeURL);
		}
		else {
			returnValues.put("outThumbRelativeURL", "");
		}
		
		return returnValues;
	}
	
	
	public static String generateThumbResource(String fileName, Long nWidth, Long nHight) throws IOException {
		if (nWidth == null) nWidth = Long.parseLong(defaultWidth);
		if (nHight == null) nHight = Long.parseLong(defaultHeight);		
		
		String resourceFullPath = PropertiesUtil.confProperties.getProperty("resource.root.resourcePath") + File.separator + fileName;
		
		String outFileName = UUID.randomUUID().toString() + ".jpg";
		String outFileFullPath = PropertiesUtil.confProperties.getProperty("resource.root.resourceThumbPath") + File.separator + outFileName;
		String outThumbRelativeURL = PropertiesUtil.confProperties.getProperty("resource.root.resourceThumbRelativeURL") + outFileName;
		
		Thumbnails.of(resourceFullPath).size(nWidth.intValue(), nHight.intValue()).outputFormat("jpg").toFile(outFileFullPath);
		
		return outThumbRelativeURL;
	}
}
