from flask import Flask, jsonify, request
import RFM_Generate
import sales_forecast
import Recommend_product
from flask_cors import CORS
from db_connector import DB

app = Flask(__name__)
CORS(app)


@app.route('/rfm_generate')
def rfm_generate():
    res = RFM_Generate.rfm_generator()
    print(res)
    segment_value_count = res.RFM.value_counts()
    return jsonify(segment_value_count.to_dict())


@app.route('/lstm_predict')
def lstm_predict():
    db = DB()
    pname = request.args.get('name')
    nmonth = request.args.get('nmonth')
    pid = db.pname_to_pid(pname)
    print(pname, pid)
    if pid is not None:
        series, prediction, month = sales_forecast.forecast(int(pid), int(nmonth))
        return jsonify({'series': series, 'prediction': prediction, "months": month})
    else:
        return jsonify({'series': [], 'prediction': []})


@app.route('/reco_product')
def reco_product():
    pitems = request.args.get('pitems')
    res = Recommend_product.recommend_product(pitems)
    print(res)
    if res is None:
        return jsonify({'Peridict Products': "No suggestion"})
    else:
        return jsonify({'Peridict Products': res})


if __name__ == '__main__':
    app.run(host='localhost', port=4010, debug=True)
