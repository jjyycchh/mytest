package com.access.dao.device;

import java.util.List;
import java.util.Map;

import com.access.model.device.Component;
import com.access.model.device.ComponentWithBLOBs;

public interface ComponentMapper {
    int deleteByPrimaryKey(Long id);

    int insert(ComponentWithBLOBs record);

    int insertSelective(ComponentWithBLOBs record);

    ComponentWithBLOBs selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ComponentWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(ComponentWithBLOBs record);

    int updateByPrimaryKey(Component record);
    
    List<ComponentWithBLOBs> getComponentsByVersion(String compenentVersion);

    List<ComponentWithBLOBs> getComponentsByVersionModel(Map<String, Object> compenentVersion);

    ComponentWithBLOBs getComponentByVersionAndType(Map<String, String> param);
    
    List<ComponentWithBLOBs> getComponentsByType(String type);
    
    ComponentWithBLOBs getComponentNew(Map<String, Object> compenent);
}