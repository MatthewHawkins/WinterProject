# LOAD IN OUR LIBRARIES
import pandas as pd
import requests as req
import yfinance as yf
import time
from pandas.core.resample import h
from numpy.core.numeric import NaN

while(1):
  # LOAD IN OUR DATA SET
  # MAKE SURE THIS DATA SET IS IN DIRECTORY
  country_data = pd.read_csv('Country_DataV1.11 - Sheet1.csv')
  countries = country_data.where(country_data['Exchange'] != 'NaN')

  

  # create column for price
  for i in countries['Ticker']:
    countries['Price_Change'] = i

  # get dataframe of only our countries with exchanges and tickers
  ex_tick = countries[~countries['Exchange'].isnull()]
  ex_tick


  # function to get the data via API call
  def get_price_movement(ticker):
    print(f"getting the price movement of: {ticker}")
    company = yf.Ticker(ticker)
    print("company exists")
    stockHistory = company.history()
    print("company's history downloaded...")
    #stockHistory[0]
    #return stockHistory 
    today = stockHistory['Close'][-1]
    yesterday = stockHistory['Close'][-2]
    difference = (today - yesterday)/today
    return (difference*100)

  # CHANGES BEING MADE FOR OUR DATA

  adjusted_tickers = ex_tick['Ticker']

  # # CHANGE CASE40 to "EGPT"
  # adjusted_tickers[51] = "EGPT"

  # adjusted_tickers[59] = "^FCHI"

  # # Change 124,NL:AEX to "^AEX"
  # adjusted_tickers[124] = "^AEX"

  # # CHANGE ^NZ50 to "^NZDOW"
  # adjusted_tickers[125] = "VGI"

  # #CHANGE 186658 to 'SPY'
  # adjusted_tickers[129] = "XLF"

  # #CHANGE to  "PSEI.PS"
  # adjusted_tickers[137] = "PSEI.PS"

  # # CHANGE to DGPTDOWA
  # adjusted_tickers[139] = "SPY"

  # # ADJUST SPACE ON IMOEX.ME 
  # adjusted_tickers[142] = "IMOEX.ME"

  # # CHANGE SPX to "VOO"
  # adjusted_tickers[185] = "VOO"

  #print(adjusted_tickers)




  # CREATE TWO DATA TYPES TO USE A LIST AND A PD SERIES JUST UNCOMMENT THE LIST HERE AND IN THE FOR LOOP TO USE DATA IN A LIST DTYPE
  #price_changes = []
  price_chg_series = pd.Series()#index = tickers_and_prices.index)


  for i in adjusted_tickers:
    time.sleep(1)
    #price_changes.append(get_price_movement(f"{i}"))
    price_chg_series[i] = get_price_movement(f"{i}")
    print(i)
  price_chg_series

  updatedDF = ex_tick

  # NOW WE TAKE THE DATA FRAME AND APPEND IT TO THE CSV FILE, OVERWRITING VALUES THAT HAVE CHANGES MADE TO THEM AND MATCHING PRICE DATA MOVING FROM SMALLEST LIST TO LARGEST DATAFRAME
  ex_tick['Price_Change'] = price_chg_series.values

  # ADDS THE PRICE MOVEMENT DATA TO THE RESPECTIVE INDEX OF OUT MASTER CSV FILE
  for x in ex_tick:
    countries['Price_Change'] = updatedDF['Price_Change']

  # CREATES AND SENDS THE MASTER CSV FILE TO DIRECTORY
  countries.to_csv('Country_Exchange_Data.csv')

  # Additional CSV FILES to export
  # exchanges and tickers only
  ex_tick.to_csv('ONLY_PRICE_CHG.csv')
  # 
  ex_tick.to_csv()

  # DATA IN DATAFRAME FORMAT 
  #updatedDF = ex_tick
  #display(updatedDF)
  # JSON FORMAT
  #jsondata = ex_tick.to_json()
  #jsondata
  # FUNCTION TO CREATE NEEDED DATA FILES IN BOTH JSON AND CSV
  def get_data_files(ex_tick):
    ex_tickISO = ex_tick['ISO3']
    ex_tickISO

    ex_tickIndex = ex_tick['Ticker']
    ex_tickIndex

    ex_tickExchange = ex_tick['Exchange']
    ex_pct_chg = ex_tick['Price_Change']



    frames = [ex_tickISO, ex_tickExchange, ex_pct_chg]

    df = pd.DataFrame(frames)
    df = df.T

    df = df.set_index('ISO3')
    df

    df.to_json('ISO3_tick.json')
    df.to_csv('ISO3_tick.csv')

  get_data_files(ex_tick)