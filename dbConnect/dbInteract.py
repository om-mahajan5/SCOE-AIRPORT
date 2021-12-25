import psycopg2
import os
import logging

def get(query):
    with psycopg2.connect(host=os.environ["DB_HOST"],database=os.environ["DB"],user=os.environ["DB_USER"],password=os.environ["DB_PASSWORD"],port=os.environ["DB_PORT"]) as conn:
        with conn.cursor() as cur:
            results = None
            try:
                cur.execute(query)
                results = cur.fetchall()
            except psycopg2.Error as e:
                logging.error(e)
            return results

def set(query):
    with psycopg2.connect(host=os.environ["DB_HOST"],database=os.environ["DB"],user=os.environ["DB_USER"],password=os.environ["DB_PASSWORD"],port=os.environ["DB_PORT"]) as conn:
        with conn.cursor() as cur:
            results = None
            try:
                cur.execute(query)
                conn.commit()
                return None
            except psycopg2.Error as e:
                logging.error(e)
                return e.pgcode
