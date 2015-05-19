package com.access.core.util;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.access.model.account.AccountWithBLOBs;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class SiteInfoUtil {
	public class TemplateCls {
		public String name;
		public String defaultdata;
		public String type;
		public String createdatetime;
		public LayoutCls layout;
		public List<ModuleCls> modules;
		
		public Map<String, Object> toSerializableObj() {
			List<Map<String, Object>> mappedModules = null;
			if (this.modules != null && this.modules.size() > 0) {
				for (ModuleCls moduleCls : modules) {
					if (mappedModules == null) {
						mappedModules = new ArrayList<Map<String, Object>>();
					}
					
					mappedModules.add(moduleCls.toSerializableObj());
				}
			}
			
			Map<String, Object> mappedTemplate = new HashMap<String, Object>();
			mappedTemplate.put("name", this.name == null ? "" : this.name);
			mappedTemplate.put("defaultdata", this.defaultdata == null ? "" : this.defaultdata);
			mappedTemplate.put("type", this.type == null ? "" : this.type);
			mappedTemplate.put("createdatetime", this.createdatetime == null ? "" : this.createdatetime);
			mappedTemplate.put("layout", this.layout.toSerializableObj());
			mappedTemplate.put("modules", mappedModules == null ? "" : mappedModules);
			
			return mappedTemplate;
		}
	}
	
	public class LayoutCls {
		public Object header;
		public Object body;
		public Object footer;
		public Object script;
		public Object css;
		public Object modal;
		
		public Map<String, Object> toSerializableObj() {
			Map<String, Object> mappedLayout = new HashMap<String, Object>();
			
			mappedLayout.put("header", this.header == null ? "" : this.header);
			mappedLayout.put("body", this.body == null ? "" : this.body);
			mappedLayout.put("footer", this.footer == null ? "" : this.footer);
			mappedLayout.put("script", this.script == null ? "" : this.script);
			mappedLayout.put("css", this.css == null ? "" : this.css);
			mappedLayout.put("modal", this.modal == null ? "" : this.modal);
			
			return mappedLayout;
		}
	}

	public class ModuleCls {
		public String moduleid;
		public String layout;
		public String type;
		public Object permission; //Map<String, List<String>>
		public List<ComponentCls> components;
		
		public Map<String, Object> toSerializableObj() {
			List<Map<String, Object>> mappedComponents = null; 
			
			if (components != null && components.size() > 0) {
				for (ComponentCls component : components) {
					if (mappedComponents == null) {
						mappedComponents = new ArrayList<Map<String, Object>>();
					}
					
					mappedComponents.add(component.toSerializableObj());
				}
			}
			
			Map<String, Object> mappedModule = new HashMap<String, Object>();
			mappedModule.put("moduleid", this.moduleid == null ? "" : this.moduleid);
			mappedModule.put("layout", this.layout == null ? "" : this.layout);
			mappedModule.put("type", this.type == null ? "" : this.type);
			mappedModule.put("permission", this.permission == null ? "" : this.permission);
			mappedModule.put("components", mappedComponents == null ? "" : mappedComponents);
			
			return mappedModule;
		}
	}
	
	public class ComponentCls {
		public String componentid;
		public Object permission; //Map<String, List<String>>
		public String content;
		
		public Map<String, Object> toSerializableObj() {
			Map<String, Object> mappedComponent = new HashMap<String, Object>();
			mappedComponent.put("componentid", this.componentid == null ? "" : this.componentid);
			mappedComponent.put("permission", this.permission == null ? "" : this.permission);
			mappedComponent.put("content", this.content == null ? "" : this.content);
			return mappedComponent;
		}
	}
	
	//////////////////////////////////////////////////////////////////
	public class PageDataCls {
		public LayoutDataCls layout;
		public List<ModuleDataCls> modules;
		
		public Map<String, Object> toSerializableObj() {
			List<Map<String, Object>> mappedModulesData = null;
			if (this.modules != null && this.modules.size() > 0) {
				for (ModuleDataCls module : this.modules) {
					if (mappedModulesData == null) {
						mappedModulesData = new ArrayList<Map<String, Object>>();
					}
					mappedModulesData.add(module.toSerializableObj());
				}
			}
			
			Map<String, Object> mapPageData = new HashMap<String, Object>();
			mapPageData.put("modules", mappedModulesData == null ? "" : mappedModulesData);
			mapPageData.put("layout", layout.toSerializableObj());
			
			return mapPageData;
		}
	}
	
	public class LayoutDataCls {
		public Object header;
		public Object body;
		public Object footer;
		public Object script;
		public Object css;
		public Object modal;
		
		public Map<String, Object> toSerializableObj() {
			Map<String, Object> mappedLayoutData = new HashMap<String, Object>();
			
			mappedLayoutData.put("header", this.header == null ? "" : this.header);
			mappedLayoutData.put("body", this.body == null ? "" : this.body);
			mappedLayoutData.put("footer", this.footer == null ? "" : this.footer);
			mappedLayoutData.put("script", this.script == null ? "" : this.script);
			mappedLayoutData.put("css", this.css == null ? "" : this.css);
			mappedLayoutData.put("modal", this.modal == null ? "" : this.modal);
			
			return mappedLayoutData;
		}
	}
	
	public class ModuleDataCls {
		public String moduleid;
		public Object layout;
		public List<ComponentDataCls> components;
		
		public Map<String, Object> toSerializableObj() {
			
			List<Map<String, Object>> mappedComponentsData = null;
			if (this.components != null && this.components.size() > 0) {
				for (ComponentDataCls componentData : this.components) {
					if (mappedComponentsData == null) {
						mappedComponentsData = new ArrayList<Map<String, Object>>();
					}
					mappedComponentsData.add(componentData.toSerizlizableObj());
				}
			}
			
			Map<String, Object> mappedModuleData = new HashMap<String, Object>();
			mappedModuleData.put("moduleid", this.moduleid == null ? "" : this.moduleid );
			mappedModuleData.put("layout", this.layout == null ? "" : this.layout );
			mappedModuleData.put("components", mappedComponentsData == null ? "" : mappedComponentsData);
			
			return mappedModuleData;
		}
	}
	
	public class ComponentDataCls {
		public String componentid;
		public Object content;
		
		public Map<String, Object> toSerizlizableObj() {
			Map<String, Object> mappedComponentData = new HashMap<String, Object>();
			mappedComponentData.put("componentid", this.componentid == null ? "" : this.componentid);
			mappedComponentData.put("content", this.content == null ? "" : this.content);
			
			return mappedComponentData;
		}
	}
	
	private static Map<String, List<String>> convertPermissionToMap(Object permission) {
		return new Gson().fromJson(permission.toString(), new TypeToken<Map<String, List<String>>>(){}.getType());
	}
	
	public static boolean hasPermission(Map<String, List<String>> templatePermission, AccountWithBLOBs optAccount) {
		boolean hasPermission;
		
		System.out.println(new Gson().toJson(templatePermission));
		// TODO: add prevention code for parameter NullPointerException
		List<String> acctIdLst = templatePermission.get("accountId");
		List<String> acctTypeLst = templatePermission.get("accountType");
		
		if (acctIdLst.contains(optAccount.getId().toString()) || acctTypeLst.contains(optAccount.getType())) {
			hasPermission = true;
		}
		else {
			hasPermission = false;
		}

		return hasPermission;
	}
	
	@SuppressWarnings("unchecked")
	public static Map<String, List<String>> getPermissionFromTemplateCls(String moduleId, String componentId, TemplateCls tmpClsWithoutCvnPerm) {
		Map<String, List<String>> permission = null;
		
		if (tmpClsWithoutCvnPerm != null && StringUtils.isNotBlank(moduleId)) {
//			String strPermission = null;
			for (ModuleCls moduleCls: tmpClsWithoutCvnPerm.modules) {
				if (moduleCls.moduleid.equalsIgnoreCase(moduleId)){
					if (StringUtils.isBlank(componentId)) {
						permission = (Map<String, List<String>>) moduleCls.permission;
					}
					else {
						for (ComponentCls componentCls : moduleCls.components) {
							if (componentCls.componentid.equalsIgnoreCase(componentId)) {
								permission = (Map<String, List<String>>) componentCls.permission;
								
								break;
							}
						}
					}
					break;
				}
			}
			
/*			if (StringUtils.isNotEmpty(strPermission)) {
				permission = convertPermissionToMap(strPermission);
			}*/
		}
		
		return permission;
	}
	
	public static List<ComponentDataCls> getModuleComponentsFromPageData(String moduleId, PageDataCls pageData) {
		List<ComponentDataCls> componentDatas = null;
		
		if (pageData != null && StringUtils.isNotBlank(moduleId)) {
			for (ModuleDataCls moduleData: pageData.modules) {
				if (moduleData.moduleid.equalsIgnoreCase(moduleId)) {
					componentDatas = moduleData.components;
					break;
				}
			}
		}
		
		return componentDatas;
	}
	
	public static Object getComponentDataFromPageData(String moduleId, String componentId, PageDataCls pageData) {
		Object data = null;
		
		if (pageData != null && StringUtils.isNotBlank(moduleId) && StringUtils.isNotBlank(componentId)) {
			List<ComponentDataCls> components = getModuleComponentsFromPageData(moduleId, pageData);
			
			if (components != null && components.size() > 0) {
				for (ComponentDataCls componentData: components) {
					if (componentData.componentid.equalsIgnoreCase(componentId)) {
						data = componentData.content;
						break;
					}
				}
			}
		}
		
		return data;
	}
	
	public static TemplateCls convertPageTemplateToClass(AccountWithBLOBs optAccount, String template, boolean isConvertPerm) {
		TemplateCls temp = new Gson().fromJson(template, TemplateCls.class);
		if (isConvertPerm) {
			String accountId = optAccount.getId().toString();
			String accountType = optAccount.getType();
			
			for (ModuleCls moduleCls: temp.modules) {
				moduleCls.permission = convertPermissionToMap(moduleCls.permission);
				
				@SuppressWarnings("unchecked")
				List<String> moduleAcctIdLst = ((Map<String, List<String>>) moduleCls.permission).get("accountId");
				@SuppressWarnings("unchecked")
				List<String> moduleAcctTypeLst = ((Map<String, List<String>>) moduleCls.permission).get("accountType");
				
				if (moduleAcctIdLst.contains(accountId) || moduleAcctTypeLst.contains(accountType)) {
					moduleCls.permission = Boolean.TRUE.toString();
				}
				else {
					moduleCls.permission = Boolean.FALSE.toString();
				}
				
				for (ComponentCls componentCls : moduleCls.components) {
					componentCls.permission = convertPermissionToMap(componentCls.permission);
					
					@SuppressWarnings("unchecked")
					List<String> componentAcctIdLst = ((Map<String, List<String>>) componentCls.permission).get("accountId");
					@SuppressWarnings("unchecked")
					List<String> componentAcctTypeLst = ((Map<String, List<String>>) componentCls.permission).get("accountType");
					
					if (componentAcctIdLst.contains(accountId) || componentAcctTypeLst.contains(accountType)) {
						componentCls.permission = Boolean.TRUE.toString();
					}
					else {
						componentCls.permission = Boolean.FALSE.toString();
					}
				}
			}
		}
		
		return temp;
	}
	
	public static PageDataCls convertPageDataToClass(String strPageData) {
		PageDataCls pageData = new Gson().fromJson(strPageData, PageDataCls.class);
		
		return pageData;
	}
}
