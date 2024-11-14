import pickle
import sys
def predict():
    comment = sys.argv[1]
    
    CommentModel = pickle.load(open('./teluguAbusiveCommentDetector.sav','rb'))
    tfidf = pickle.load(open('./tfidf.sav','rb'))
    
    comment = tfidf.transform([comment]).toarray()
    prediction = CommentModel.predict(comment)
    print(prediction[0])
    sys.stdout.flush()

predict()

