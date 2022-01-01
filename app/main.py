from datetime import datetime, time, timedelta
from flask import Flask, json, request, render_template
from dbConnect.dbInteract import get, set
import pandas as pd
import csv

app = Flask(__name__, template_folder="../templates", static_folder="../static")


@app.route("/")
def home_view():
    # return "<h1>Welcome to DBMS</h1>"
    return render_template("index.html")


@app.route("/test")
def test():
    return "App Working"


@app.route("/schedule")
def schedule_view():
    time = None
    # schedule = get(f'SELECT * FROM schedule WHERE timestamp> {time if time != None else datetime.now().strftime("%Y-%m-%d %T")} ORDER BY "timestamp" DESC LIMIT 2')
    return render_template("schedule.html")


@app.route("/book/<int:tripId>")
def book_ticket_view(tripId):
    tripId, icao, timestamp, city, rate, airport_name, airline_name = get(
        f"""SELECT public.schedule.trip_id,public.schedule.icao,public.schedule.timestamp,public.destination.city,public.schedule.rate,public.destination.airport_name,public.plane.name FROM public.schedule
JOIN public.destination
ON public.schedule.icao = public.destination.icao
JOIN public.plane
ON public.schedule.flight_number = public.plane.flight_number
WHERE public.schedule.trip_id={tripId};
    """
    )[0]

    return render_template(
        "bookTicket.html",
        data={
            "icao": icao,
            "timestamp": timestamp,
            "city": city,
            "rate": rate,
            "airport_name": airport_name,
            "airline_name": airline_name,
        },
    )


@app.route("/login")
def login_view():
    return render_template("login.html")


@app.route("/api/<string:query>")
def api(query):
    print(get(query))
    return "hi"


@app.route("/api2/<string:query>")
def api2(query):
    destinationList = []
    for row in get(query):
        destinationList.append(row[1])
    print({"Dest": destinationList})
    return {"Dest": destinationList}


@app.route("/api/get/schedule")
def getSchedule():
    print(request.args.get("startdate"))
    now = datetime.now().strftime("%Y-%m-%d %T")
    lastDate = datetime.now() + timedelta(days=10)
    startdate = request.args.get("startdate") if request.args.get("startdate") else now
    enddate = request.args.get("enddate") if request.args.get("enddate") else lastDate
    schedule = get(
        f"SELECT * FROM schedule WHERE timestamp> '{startdate}' AND timestamp < '{enddate}' ORDER BY \"timestamp\" ASC"
    )
    # schedule = get(f'SELECT * FROM schedule WHERE timestamp> {timestamp if timestamp != None else datetime.now().strftime("%Y-%m-%d %T")} ORDER BY "timestamp" DESC')
    scheduleDF = pd.DataFrame(schedule)
    # print(scheduleDF.to_json())
    # return type(get('SELECT * FROM schedule'))
    # return {"hi":json.dumps(get('SELECT * FROM schedule'))}
    # return "Hi"
    return json.loads(scheduleDF.to_json())


@app.route("/api/schedule2")
def getSchedule2():
    timestamp = request.args.get("timestamp")
    schedule = get(
        f'SELECT * FROM schedule WHERE timestamp> \'{"2021-11-29" if timestamp != None else datetime.now().strftime("%Y-%m-%d %T")}\' ORDER BY "timestamp" DESC'
    )
    scheduleDF = pd.DataFrame(
        schedule, columns=["trid_id", "rate", "flight_number", "icao", "timestamp"]
    )
    print(scheduleDF.to_json(orient="values"))
    return json.loads(scheduleDF.to_json(orient="split"))


@app.route("/api/get/destinations", methods=["POST"])
def destinationPOST():
    icao_list = request.form
    icao_list = "'" + "','".join([*icao_list.values()]) + "'"
    destinations = get(
        "SELECT icao,city FROM destination WHERE icao IN ({})".format(icao_list)
    )
    destinations = pd.DataFrame(destinations, columns=["icao", "city"])
    destinations["city"] = destinations["city"].str.strip()
    destinations.set_index("icao", inplace=True)
    # print(destinations.to_json(orient='index'))
    # print(destination_list)
    return destinations.to_dict(orient="index")


@app.route("/api/get/ticketdetails", methods=["POST"])
def get_ticket_details():
    tripId = request.form.get("tripId")
    tripId, icao, timestamp, city, rate, airport_name, airline_name = get(
        f"""SELECT public.schedule.trip_id,public.schedule.icao,public.schedule.timestamp,public.destination.city,public.schedule.rate,public.destination.airport_name,public.plane.name FROM public.schedule
JOIN public.destination
ON public.schedule.icao = public.destination.icao
JOIN public.plane
ON public.schedule.flight_number = public.plane.flight_number
WHERE public.schedule.trip_id={tripId};
    """
    )[0]

    return {
        "tripId": tripId,
        "icao": icao,
        "timestamp": timestamp,
        "city": city,
        "rate": rate,
        "airport_name": airport_name,
        "airline_name": airline_name,
    }


@app.route("/api/book", methods=["POST"])
def book_ticket():
    if request.method == "POST":
        tripId = request.form.get("tripId")
        userId = request.form.get("uid")
        price = request.form.get("price")
        print(tripId)
        set(
            f'INSERT INTO public.tickets (purchase_date,ticket_price,trip_id,email) VALUES (TO_DATE(\'{datetime.today().strftime("%d/%m/%Y")}\', \'DD/MM/YYYY\'),{price},{tripId},\'{userId}\')'
        )
    return "done"
