import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import { Rating } from 'primereact/rating';
import PropTypes from 'prop-types';

export const RatingSummary = ({ summary }) => {
  if (!summary || !summary.ratingCounts) return null;

  const totalRatings = Object.values(summary.ratingCounts).reduce(
    (acc, curr) => acc + curr,
    0,
  );
  const totalStars = Object.entries(summary.ratingCounts).reduce(
    (acc, [rating, count]) => acc + rating * count,
    0,
  );
  const avgRating = parseFloat((totalStars / totalRatings).toFixed(2));

  return (
    <Card title="Resumo">
      <div>
        <h3>
          Média: {isNaN(avgRating) ? 0 : avgRating} - Total:{' '}
          {summary.feedbackCount}
        </h3>
      </div>
      {[1, 2, 3, 4, 5].map((rating) => {
        const count = summary.ratingCounts[rating] || 0;
        const percentage = ((count / totalRatings) * 100).toFixed(2);

        return (
          <div key={rating} className="flex mt-2">
            <div style={{ width: '50%' }}>
              <ProgressBar value={percentage} showValue />
            </div>
            <div className="ml-1">
              <Rating value={rating} readOnly stars={5} cancel={false} />
            </div>
            <span className="ml-2">
              {' '}
              {count} pessoa(s) ({isNaN(percentage) ? 0 : percentage}%)
            </span>
          </div>
        );
      })}
    </Card>
  );
};

RatingSummary.propTypes = {
  summary: PropTypes.shape({
    ratingCounts: PropTypes.objectOf(PropTypes.number),
    feedbackCount: PropTypes.number,
  }),
};

RatingSummary.defaultProps = {
  summary: null,
};
