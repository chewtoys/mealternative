import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Slide, Fab, Avatar, Tooltip } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import useStyles from './Style';
import ThumbNail from './_components/ThumbNail';
import TitleDes from './_components/TitleDes';
import MiscActions from './_components/MiscActions';
import ListsCatIng from './_components/ListsCatIng';
import Steps from './_components/Steps';
import PageSpinner from '../Spinner/PageSpinner';
import ErrorSnack from '../ErrorModal/ErrorSnack';
import SuccessSnack from '../InfoModal/SuccessSnack';

const RecipeDetail = props => {
  const {
    handleLikeAction,
    handleBack,
    showModal,
    loading,
    cleanUp,
    error,
    recipeDetails,
    handleBookAction,
    handleRateAction,
    message
  } = props;
  const classes = useStyles();

  const {
    likes,
    bookmarks,
    ingredients,
    categories,
    rating,
    postedBy,
    thumbImageUrl,
    title,
    description,
    steps,
    liked,
    booked
  } = recipeDetails;

  return (
    <Slide
      timeout={200}
      direction='left'
      in={showModal}
      mountOnEnter
      unmountOnExit
    >
      <Paper className={classes.detailRecipeRoot}>
        <PageSpinner loading={loading} />
        <ErrorSnack error={error} handleClose={cleanUp} />
        <SuccessSnack message={message} handleClose={cleanUp} />
        <Fab
          color='primary'
          className={classes.detailCloseBtn}
          onClick={handleBack}
          variant='extended'
        >
          <ArrowBack />
          Back
        </Fab>
        {!loading && postedBy && (
          <>
            <Tooltip title={postedBy.username} alt={postedBy.username}>
              <Avatar
                src={postedBy.photoUrl}
                className={classes.detailAvatar}
              />
            </Tooltip>
            <ThumbNail imgUrl={thumbImageUrl} classes={classes} />
            <TitleDes
              title={title}
              description={description}
              classes={classes}
            />
            <MiscActions
              handleRateAction={handleRateAction}
              handleLikeAction={handleLikeAction}
              handleBookAction={handleBookAction}
              likes={likes}
              bookmarks={bookmarks}
              rating={rating}
              classes={classes}
              liked={liked}
              booked={booked}
            />
            <ListsCatIng
              ingredients={ingredients}
              categories={categories}
              classes={classes}
            />
            <Steps steps={steps} classes={classes} />
          </>
        )}
      </Paper>
    </Slide>
  );
};

RecipeDetail.propTypes = {
  recipeDetails: PropTypes.any,
  handleLikeAction: PropTypes.func.isRequired,
  handleBookAction: PropTypes.func.isRequired,
  handleRateAction: PropTypes.func.isRequired
};

export default RecipeDetail;