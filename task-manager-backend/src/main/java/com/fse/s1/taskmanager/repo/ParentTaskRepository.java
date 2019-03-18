package com.fse.s1.taskmanager.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.fse.s1.taskmanager.entity.ParentTask;

@Repository
public interface ParentTaskRepository extends CrudRepository<ParentTask, Long> {

	public ParentTask findByParentTask(String parentTask);
}
