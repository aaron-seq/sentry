from sentry.objectstore.service import Client, ClientBuilder

__all__ = ["attachments", "preprod", "Client", "ClientBuilder"]

attachments = ClientBuilder("attachments")
preprod = ClientBuilder("preprod")
