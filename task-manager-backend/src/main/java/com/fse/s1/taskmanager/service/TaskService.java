package com.fse.s1.taskmanager.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fse.s1.taskmanager.entity.ParentTask;
import com.fse.s1.taskmanager.entity.Task;
import com.fse.s1.taskmanager.repo.TaskRepository;
import com.fse.s1.taskmanager.to.SearchCriteria;
import com.fse.s1.taskmanager.util.TaskUtil;

@Service
public class TaskService implements ITaskService{

	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private IParentTaskService parentTaskService;

	@Override
	public Task getTask(long id){
		Task task = taskRepository.findById(id).orElse(new Task());
		return task;
	}

	@Override
	public List<Task> getFilteredTask(SearchCriteria criteria){
		criteria = TaskUtil.convertObjectFieldsFromEmptyToNull(criteria);
		List<Task> taskList = new LinkedList<>();
		boolean isNumber = true;
		boolean parentIsNumber = true;
		try{
			Integer.parseInt(criteria.getTask());
		}catch(NumberFormatException e){
			isNumber = false;
		}
		int parentId = 0;
		try{
			parentId = Integer.parseInt(criteria.getParentTask());
		}catch(NumberFormatException e){
			parentIsNumber = false;
		}
		if(!parentIsNumber){
			ParentTask pt = parentTaskService.getParentByName(criteria.getParentTask());
			if(pt != null){
				parentId = new Long(pt.getParentId()).intValue();
			}else if(isNumber){
				parentId = -1;
			}
		}
		
		if(!isNumber){
		taskRepository
		.findTasksByTaskAndParentTask(criteria.getTask(), 
									  parentId, 
									  criteria.getPriorityFrom(),
									  criteria.getPriorityTo(),
									  criteria.getStartDate(),
									  criteria.getEndDate())
		.forEach(e -> {
						  taskList.add(e);
					  });
		}else{
			Task task = this.getTask(Long.parseLong(criteria.getTask()));
			if(task != null && task.getTaskId() != 0)
				taskList.add(task);
		}
		return taskList;
	}

	@Override
	public Task saveTask(Task taskDetails){
		if(parentExists(taskDetails)){
			Task td = taskRepository.save(taskDetails);
			return td;
		}
		return null;
	}

	@Override
	public Task updateTask(Task taskDetails){
		if(taskDetails.getTaskId() == 0L)
			return null;
		if(parentExists(taskDetails)){
			Task td = taskRepository.save(taskDetails);
			return td;
		}
		return null;
	}

	@Override
	public void deleteTask(long id){
		boolean exists = this.taskRepository.existsById(id);
		if(exists)
			this.taskRepository.deleteById(id);
	}
	
	private boolean parentExists(Task taskDetails){
		ParentTask existingParent = parentTaskService.parentTaskExists(taskDetails.getParent().getParentTask());
		if(existingParent == null || existingParent.getParentId() == 0){
			ParentTask pTask = parentTaskService.addParentTask(taskDetails.getParent());
			taskDetails.setParent(pTask);
		}else{
			taskDetails.setParent(existingParent);
		}
		return true;
	}
}
