import psycopg2
import os
import logging
conn = psycopg2.connect(host=os.environ["DB_HOST"],database=os.environ["DB"],user=os.environ["DB_USER"],password=os.environ["DB_PASSWORD"],port=os.environ["DB_PORT"])

cur = conn.cursor()

def get(query):
    try:
        cur.execute(query)
        results = cur.fetchall()
    except psycopg2.Error as e:
        logging.error(e)
    finally:
        cur.close()
        conn.close()
    return None

def set(query):
    try:
        cur.execute(query)
        conn.commit()
        return None
    except psycopg2.Error as e:
        return e.pgcode