package com.fse.s1.taskmanager.service;

import com.fse.s1.taskmanager.entity.ParentTask;

public interface IParentTaskService {

	public ParentTask getParentTask(long id);
	
	public ParentTask parentTaskExists(String pt);
	
	public ParentTask addParentTask(ParentTask parentTask);
	
	public ParentTask getParentByName(String name);
}
