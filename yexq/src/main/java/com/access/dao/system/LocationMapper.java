package com.access.dao.system;

import com.access.model.system.Location;

import java.util.List;
import java.util.Map;

public interface LocationMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Location record);

    int insertSelective(Location record);

    Location selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Location record);

    int updateByPrimaryKeyWithBLOBs(Location record);

    int updateByPrimaryKey(Location record);
    
    List<Location> searchLocation(Location location);
    
    List<Location> getLocationList(Long accountId);
    
    Location getEmptyLocaitonByAccountId(Long accountId);
    
    String selectByLocation(Location record);
}