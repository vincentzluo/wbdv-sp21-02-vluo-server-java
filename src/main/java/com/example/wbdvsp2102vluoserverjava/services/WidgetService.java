package com.example.wbdvsp2102vluoserverjava.services;

import com.example.wbdvsp2102vluoserverjava.models.Widget;
import com.example.wbdvsp2102vluoserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {


  @Autowired
  WidgetRepository repository;

  public Widget createWidgetForTopic(String topicId, Widget widget) {
    widget.setTopicIc(topicId);
//    widget.setId((new Date()).getTime());

    return repository.save(widget);
  }

  public List<Widget> findAllWidgets() {
    return (List<Widget>) repository.findAll();
  }
  public List<Widget> findWidgetsForTopic(String topicId) {
    return repository.findWidgetsForTopic(topicId);
  }

  public Integer deleteWidget(Long id) {
    repository.deleteById(id);
    return 1;
  }

  public Integer updateWidget(Long id, Widget widget) {
    Widget originalWidget = repository.findById(id).get();
    originalWidget.setText(widget.getText());
    originalWidget.setTopicIc(widget.getTopicIc());
    originalWidget.setType(widget.getType());
    originalWidget.setSize(widget.getSize());
    originalWidget.setOrdered(widget.isOrdered());
    originalWidget.setSrc(widget.getSrc());
    originalWidget.setHeight(widget.getHeight());
    originalWidget.setWidth(widget.getWidth());

    repository.save(originalWidget);

    return 1;
  }
}