package com.example.wbdvsp2102vluoserverjava.repositories;

import com.example.wbdvsp2102vluoserverjava.models.Widget;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WidgetRepository
    extends CrudRepository<Widget, Long> {

  //@Query(value = "SELECT * FROM widgets WHERE topic_ic=:tid", nativeQuery = true)
  @Query("SELECT widget FROM Widget widget")
  public List<Widget> findAllWidgets();

  @Query(value="SELECT * FROM widgets WHERE id=:wid", nativeQuery = true)
  public Widget findWidgetById(@Param("wid") Long widgetId);

  @Query(value="SELECT * FROM widgets WHERE topic_ic=:tid", nativeQuery = true)
  public List<Widget> findWidgetsForTopic(@Param("tid") String topicId);
}