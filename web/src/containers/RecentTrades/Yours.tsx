import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '../../components';
import { DEFAULT_MARKET } from '../../constants';
import { localeDate } from '../../helpers';
import {
  fetchHistory,
  selectCurrentMarket,
  selectCurrentPrice,
  selectHistory,
  selectHistoryLoading,
  setCurrentPrice,
} from '../../modules';
import { handleHighlightValue } from './Market';
import { TradeTableCell } from './RecentTradesTableCell';

const timeFrom = String(Math.floor((Date.now() - 1000 * 60 * 60 * 24) / 1000));

export const RecentTradesYours = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const list = useSelector(selectHistory);
  const fetching = useSelector(selectHistoryLoading);
  const currentMarket = useSelector(selectCurrentMarket) || DEFAULT_MARKET;
  const currentPrice = useSelector(selectCurrentPrice);

  const headers = React.useMemo(
    () => [
      formatMessage({ id: 'page.body.trade.header.recentTrades.content.time' }),
      formatMessage({ id: 'page.body.trade.header.recentTrades.content.amount' }),
      formatMessage({ id: 'page.body.trade.header.recentTrades.content.price' }),
    ],
    [formatMessage],
  );

  const renderRow = (item, i) => {
    const { id, created_at, price, amount, taker_type } = item;
    const priceFixed = currentMarket ? currentMarket.price_precision : 0;
    const amountFixed = currentMarket ? currentMarket.amount_precision : 0;
    const higlightedDate = handleHighlightValue(
      String(localeDate([...list][i - 1] ? [...list][i - 1].created_at : '', 'time')),
      String(localeDate(created_at, 'time')),
    );

    return [
      <TradeTableCell higlightedDate={higlightedDate} takerType={taker_type} type="date" />,
      <TradeTableCell
        amount={amount}
        takerType={taker_type}
        amountFixed={amountFixed}
        type="amount"
      />,
      <TradeTableCell
        price={price}
        priceFixed={priceFixed}
        prevValue={[...list][i - 1] ? [...list][i - 1].price : 0}
        amountFixed={amountFixed}
        takerType={taker_type}
        id={id}
        type="price"
      />,
    ];
  };

  const retrieveData = () => {
    return list.length > 0 ? list.map(renderRow) : [[]];
  };

  const renderContent = () => {
    return <Table header={headers} data={retrieveData()} onSelect={handleOnSelect} />;
  };

  const handleOnSelect = (index: string) => {
    const priceToSet = list[Number(index)] ? Number(list[Number(index)].price) : 0;

    if (currentPrice !== priceToSet) {
      dispatch(setCurrentPrice(priceToSet));
    }
  };

  React.useEffect(() => {
    dispatch(
      fetchHistory({
        type: 'trades',
        page: 0,
        time_from: timeFrom,
        market: currentMarket.id,
      }),
    );
  }, [dispatch, currentMarket.id]);

  return (
    <div>
      {fetching ? (
        <div className="cr-tab-content-loading">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
};
