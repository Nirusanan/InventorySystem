from flask import Flask, jsonify, request
import rfmGener
import sales_forecast
import recommend_product
from flask_cors import CORS
from db_connector import DB
app = Flask(__name__)
CORS(app)


@app.route('/rfm_generate')
def rfm_generate():
    res = rfmGener.rfm_generater()
    print(res)
    l = res.RFM.value_counts()
    print(type(l))
    return jsonify(l.to_dict())


@app.route('/lstm_predict')
def lstm_predict():
    db=DB()
    pname = request.args.get('name')
    nmonth = request.args.get('nmonth')
    pid=db.pname_to_pid(pname)
    if pid is not None:
        series, prediction, month = sales_forecast.forecast(int(pid), int(nmonth))
        print(month)
        return jsonify({'series': series, 'prediction': prediction , "months": month})
    else:
        return jsonify({'series': [], 'prediction': []})


@app.route('/reco_product')
def reco_product():
    pitems = request.args.get('pitems')
    res = recommend_product.recommend_product(pitems)

    return jsonify({'Peridict Products': res})


if __name__ == '__main__':
    app.run(host='localhost', port=4010, debug=True)
