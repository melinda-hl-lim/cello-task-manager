import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import TopNav from "./shared/TopNav";
import BoardsDashboardContainer from "./dashboard/BoardsDashboardContainer";



import UISection from "./ui/UISection";
import AllBoards from "./ui/AllBoards";
import CardArchived from "./ui/CardArchived";
import CardEditingDescription from "./ui/CardEditingDescription";
import UICard from "./ui/Card";
import CopyCardPopover from "./ui/CopyCardPopover";
import CreateBoard from "./ui/CreateBoard";
import DueDatePopover from "./ui/DueDatePopover";
import LabelsPopover from "./ui/LabelsPopover";
import MoveCardPopover from "./ui/MoveCardPopover";
import SingleBoard from "./ui/SingleBoard";

import Board from "./board/Board";
import Card from './card/Card';
import { useSelector } from "react-redux";
const Application = () => {
  

  return (
    <div>
      <TopNav />
      <Route path="/(boards|cards)/:id" >
        <Board />
      </Route>
      <Route path="/cards/:id"> 
        <Card />
      </Route>
      <Route path="/" exact component={BoardsDashboardContainer} />
      <Route path="/ui" exact component={UISection} />
      <Route path="/ui/allBoards" component={AllBoards} />
      <Route path="/ui/cardArchived" component={CardArchived} />
      <Route
        path="/ui/cardEditingDescription"
        component={CardEditingDescription}
      />
      <Route path="/ui/card" component={UICard} />
      <Route path="/ui/copyCardPopover" component={CopyCardPopover} />
      <Route path="/ui/createBoard" component={CreateBoard} />
      <Route path="/ui/dueDatePopover" component={DueDatePopover} />
      <Route path="/ui/labelsPopover" component={LabelsPopover} />
      <Route path="/ui/moveCardPopover" component={MoveCardPopover} />
      <Route path="/ui/singleBoard" component={SingleBoard} />
    </div>
  );
};

export default Application;